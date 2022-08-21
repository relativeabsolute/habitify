import { Container } from "inversify";
import { config, IApiConfig } from "./config";
import { TYPES } from "./types";
import { controllers } from "../controllers";

const DiContainer = new Container();

DiContainer.bind<IApiConfig>(TYPES.ApiConfig).toConstantValue(config);
DiContainer.load(controllers);

export default DiContainer;
