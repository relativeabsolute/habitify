import { Server } from "@hapi/hapi";

import { jest } from "@jest/globals";

describe("server starts", () => {
    let server: Server;

    beforeEach(async () => {
        // TODO: figure out tests with inversified host
    });

    afterEach(async () => {
        await server.stop();
    });
});
