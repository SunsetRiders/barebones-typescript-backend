export interface IConfigServer {
    name: string;
    nodeEnv: string;
    port: number;
    dirRoot: string;
    apiKey: string;
    requestTimeout: number;
}

export interface IConfigLogs {
    transports: string[];
    log: string;
    logentriesToken: string;
    logPath: string;
}

export interface IConfigDatabase {
    postgres: {
        connectionUrl: string;
        min: number;
        max: number;
    };
}

export interface IConfig {
    server: IConfigServer;
    logs: IConfigLogs;
    database: IConfigDatabase;
}
