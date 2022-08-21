import { SpotifyController } from "./../controllers/spotify/spotify-controller";
import { Container } from "inversify";
import { config, IApiConfig } from "./config";
import { TYPES } from "./types";

const DiContainer = new Container();

DiContainer.bind<IApiConfig>(TYPES.ApiConfig).toConstantValue(config);
DiContainer.bind<SpotifyController>(SpotifyController)
    .toSelf()
    .inSingletonScope();

export default DiContainer;
