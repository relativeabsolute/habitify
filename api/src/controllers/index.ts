import { SpotifyController } from "./spotify/spotify-controller";
import { SpotifyAuthController } from "./spotify/spotify-auth-controller";
import { IController } from "./controller";
import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../di/types";

export const controllers = new ContainerModule(
    (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
        bind<IController>(TYPES.Controller).to(SpotifyAuthController);
        bind<IController>(TYPES.Controller).to(SpotifyController);
    }
);

export { IController } from "./controller";
