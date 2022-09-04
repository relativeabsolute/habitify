import { ResponseObject, Request, ResponseToolkit } from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { IController } from "./../controller";
import { IApiConfig } from "./../../di/config";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import axios from "axios";

@injectable()
export class SpotifyController implements IController {
    baseRoute = "/spotify";

    constructor(@inject(TYPES.ApiConfig) private apiConfig: IApiConfig) {}

    public configure(server: Server): void {}

    public setRoutes(server: Server): void {
        server.route({
            method: "GET",
            path: `${this.baseRoute}/me`,
            handler: this.me.bind(this),
        });
    }

    private async me(
        req: Request,
        h: ResponseToolkit
    ): Promise<ResponseObject> {
        const currentProfileUrl = "https://api.spotify.com/v1/me";
        const bearer = req.headers.authorization;
        req.log(["info", "debug"], `bearer: ${bearer}`);
        try {
            const response = await axios.get(currentProfileUrl, {
                headers: {
                    Authorization: bearer,
                },
            });
            return h.response(response.data);
        } catch (error: any) {
            req.log(["error", "spotify"], `Error data: ${error.data}`);
            return h.response().code(400);
        }
    }
}
