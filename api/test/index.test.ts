import { Server } from "@hapi/hapi";
import { init } from "../src/server";

describe("server starts", async () => {
    let server: Server;

    beforeEach((done: DoneFn) => {
        init().then((s) => {
            server = s;
            done();
        });
    });

    afterEach((done: DoneFn) => {
        server.stop().then(() => done());
    });

    it("index respods", async () => {
        const res = await server.inject({
            method: "get",
            url: "/",
        });

        expect(res.statusCode).toBe(200);
    });
});
