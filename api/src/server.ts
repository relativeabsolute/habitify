"use strict";

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";

export let server: Server;

export async function init(): Promise<Server> {
    server = Hapi.server({
        port: process.env.PORT || 9000,
        host: "0.0.0.0",
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
