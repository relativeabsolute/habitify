import "reflect-metadata";
import DiContainer from "./di/di-container";
import { AppHost } from "./server";

DiContainer.resolve<AppHost>(AppHost).start();
