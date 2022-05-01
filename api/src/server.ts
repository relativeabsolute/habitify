"use strict";

import Hapi, {
    ResponseToolkit,
    Server,
    Request,
    ResponseObject,
} from "@hapi/hapi";

export let server: Server;

function index(request: Request, h: ResponseToolkit): ResponseObject {
    return h.response().code(200);
}

export async function init(): Promise<Server> {
    server = Hapi.server({
        port: process.env.PORT || 9000,
        host: "0.0.0.0",
    });

    server.route({
        method: "GET",
        path: "/",
        handler: index,
    });

    return server;
}

export async function start(): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
}

process.on("unhandledRejection", (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
