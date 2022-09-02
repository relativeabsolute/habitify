import { Server } from "@hapi/hapi";

export interface IController {
    setRoutes(server: Server): void;
    configure(server: Server): void;
}

export const Cookies = {
    SpotifyAuthState: "spotify_auth_state",
    SpotifyAuthResponse: "spotify_auth",
};
