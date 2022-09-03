"use strict";

import Hapi, {
    ResponseToolkit,
    Server,
    Request,
    ResponseObject,
} from "@hapi/hapi";
import { inject, injectable, multiInject } from "inversify";
import { IApiConfig } from "./di/config";
import { TYPES } from "./di/types";
import { IController } from "./controllers";

export let server: Server;

function index(request: Request, h: ResponseToolkit): ResponseObject {
    return h.response().code(200);
}

@injectable()
export class AppHost {
    constructor(
        @inject(TYPES.ApiConfig) private apiConfig: IApiConfig,
        @multiInject(TYPES.Controller) private controllers: IController[]
    ) {}

    private initServer(): Server {
        let server = Hapi.server({
            port: this.apiConfig.port,
            host: "127.0.0.1",
            routes: {
                cors: {
                    origin: [this.apiConfig.frontendUrl],
                },
            },
        });
        this.controllers.forEach((controller) => {
            controller.configure(server);
            controller.setRoutes(server);
        });

        server.route({
            method: "GET",
            path: "/",
            handler: index,
        });

        return server;
    }

    async start(): Promise<void> {
        const server = this.initServer();
        await this.registerPlugins(server);
        server.log(
            ["info"],
            `Listening on ${server.settings.host}:${server.settings.port}`
        );
        return server.start();
    }

    private async registerPlugins(server: Server): Promise<void> {
        let pinoOptions: any = {
            redact: ["req.headers.authorization"],
        };
        if (process.env.NODE_ENV !== "production") {
            pinoOptions["transport"] = {
                target: "pino-pretty",
            };
        }
        await server.register({
            plugin: require("hapi-pino"),
            options: pinoOptions,
        });
    }
}
