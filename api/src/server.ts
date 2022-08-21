"use strict";

import Hapi, {
    ResponseToolkit,
    Server,
    Request,
    ResponseObject,
} from "@hapi/hapi";
import { inject, injectable } from "inversify";
import { IApiConfig } from "./di/config";
import { TYPES } from "./di/types";
import { SpotifyController } from "./controllers/spotify/spotify-controller";

export let server: Server;

function index(request: Request, h: ResponseToolkit): ResponseObject {
    return h.response().code(200);
}

@injectable()
export class AppHost {
    constructor(
        @inject(TYPES.ApiConfig) private apiConfig: IApiConfig,
        @inject(SpotifyController) private spotifyController: SpotifyController
    ) {}

    private initServer(): Server {
        let server = Hapi.server({
            port: this.apiConfig.port,
            host: "0.0.0.0",
            routes: {
                cors: {
                    origin: ["http://localhost:4200"], // TODO: get this from config
                },
            },
        });
        this.spotifyController.configure(server);

        server.route({
            method: "GET",
            path: "/",
            handler: index,
        });
        this.spotifyController.setRoutes(server);

        return server;
    }

    async start(): Promise<void> {
        const server = this.initServer();
        console.log(
            `Listening on ${server.settings.host}:${server.settings.port}`
        );
        return server.start();
    }
}
