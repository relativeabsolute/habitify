import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";
import { IApiConfig } from "../../di/config";
import { TYPES } from "../../di/types";
import { inject, injectable } from "inversify";
import { generateRandomString } from "../../utils/auth-utils";
import { Cookies, IController } from "../controller";
import axios from "axios";

@injectable()
export class SpotifyController implements IController {
    baseRoute = "/spotify";

    constructor(@inject(TYPES.ApiConfig) private apiConfig: IApiConfig) {}

    public configure(server: Server): void {
        server.state(Cookies.SpotifyAuthState);
    }

    public setRoutes(server: Server): void {
        server.route({
            method: "GET",
            path: `${this.baseRoute}/login`,
            handler: this.login.bind(this),
        });

        server.route({
            method: "GET",
            path: `${this.baseRoute}/callback`,
            handler: this.callback.bind(this),
        });
    }

    private login(req: Request, h: ResponseToolkit): ResponseObject {
        const scope = "user-read-private";
        const state = generateRandomString(16);
        const authParams = new URLSearchParams({
            response_type: "code",
            client_id: this.apiConfig.spotifyConfig.clientId,
            redirect_uri: this.apiConfig.spotifyConfig.redirectUri,
            scope: scope,
            state: state,
        });
        return h
            .response()
            .redirect(
                `https://accounts.spotify.com/authorize?${authParams.toString()}`
            )
            .state(Cookies.SpotifyAuthState, state);
    }

    private async callback(
        req: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject> {
        var code = req.query.code || null;
        var state = req.query.state || null;

        if (state === null || state !== req.state[Cookies.SpotifyAuthState]) {
            req.log(["error", "spotify"], "state mismatch");
            const errorState = new URLSearchParams({
                error: "state_mismatch",
            });
            return h.redirect(
                `${this.apiConfig.frontendUrl}/#?${errorState.toString()}`
            );
        } else {
            req.log(["info", "spotify"], "state matched");
            h.unstate(Cookies.SpotifyAuthState);
            const accessTokenUrl = "https://accounts.spotify.com/api/token";
            const tokenReqForm = new URLSearchParams({
                code: code,
                redirect_uri: this.apiConfig.spotifyConfig.redirectUri,
                grant_type: "authorization_code",
            });
            const client_id = this.apiConfig.spotifyConfig.clientId;
            const client_secret = this.apiConfig.spotifyConfig.clientSecret;
            req.log(["info", "spotify"], "initiating token request");
            try {
                const clientPair = Buffer.from(
                    `${client_id}:${client_secret}`
                ).toString("base64");
                const response = await axios.post(
                    accessTokenUrl,
                    tokenReqForm,
                    {
                        headers: {
                            Authorization: `Basic ${clientPair}`,
                        },
                    }
                );
                return h.redirect(`${this.apiConfig.frontendUrl}/#`);
            } catch (error: any) {
                req.log(["error", "spotify"], error.response);
                return h.redirect(`${this.apiConfig.frontendUrl}/#`);
            }
        }
    }
}
