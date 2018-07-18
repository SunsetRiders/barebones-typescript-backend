import BaseEnvironment from "./base-environment";
import { IConfig } from "./i-config";
import * as GetEnv from "getenv";
import * as Path from "path";

class Config extends BaseEnvironment {

    constructor() {
        super({
            filename: ".env"
        });
    }

    public static configFactory(): IConfig {
        return new Config().setProcessEnv().get();
    }

    public get(): IConfig {
        const dirRoot = GetEnv.string("ROOT_DIR", "./");
        return {
            server: {
                name: GetEnv.string("SERVICE_SERVER_NAME", "server"),
                nodeEnv: GetEnv.string("SERVICE_NODE_ENV", "development"),
                port: GetEnv.int("SERVICE_SERVER_PORT", 3000),
                dirRoot,
                apiKey: GetEnv.string("SERVICE_SERVER_API_KEY", "tokenisdevtoken"),
                requestTimeout: GetEnv.int("SERVICE_SERVER_REQUEST_TIMEOUT", 120000)
            },
            logs: {
                transports: GetEnv.array("SERVICE_LOGS_TRANSPORTS", "string", ["console"]),
                log: GetEnv.string("SERVICE_LOG_LEVEL", "info"),
                logPath: Path.resolve(dirRoot, "./log")
            },
            database: {
                postgres: {
                    connectionUrl:  GetEnv.string("SERVICE_DATABASE_URL"),
                    min: GetEnv.int("SERVICE_DATABASE_MIN_POOL"),
                    max: GetEnv.int("SERVICE_DATABASE_MAX_POOL")
                }
            }
        } as IConfig;
    }

}

export default Config;
