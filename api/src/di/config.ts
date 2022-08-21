import configRaw from "./config.json";

export interface ISpotifyConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

export interface IApiConfig {
    port: number;
    spotifyConfig: ISpotifyConfig;
}

export const config: IApiConfig = configRaw;
