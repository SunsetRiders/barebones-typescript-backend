import BaseEnvironment from "./base-environment";
import * as GetEnv from "getenv";
import * as Path from "path";

class Config extends BaseEnvironment {

    protected readonly payload: object;

    constructor() {
        super({
            filename: ".env"
        });
        this.payload = this.set();
    }

    public get(key: string): any {
        return super.get(key, this.payload);
    }

    private set(): object {
        const dirRoot = GetEnv.string("ROOT_DIR", "./");
        return {
            server: {
                name: GetEnv.string("SERVER_NAME", "vmtd-ui-provider"),
                nodeEnv: GetEnv.string("NODE_ENV", "development"),
                port: GetEnv.int("SERVER_PORT", 8000),
                dirRoot
            },
            logs: {
                transports: GetEnv.array("LOGS_TRANSPORTS", "string", ["console"]),
                log: GetEnv.string("LOG_LEVEL"),
                logentriesToken: GetEnv.string("LOGS_LOGENTRIES_TOKEN"),
                logPath: Path.resolve(dirRoot, "./log")
            },
            microservice: {
                postgres: {
                    host: GetEnv.string("POSTGRES_SERVICE_API_HOST", "http://localhost"),
                    port: GetEnv.int("POSTGRES_SERVICE_API_PORT", 3000),
                    apiKey: GetEnv.string("POSTGRES_SERVICE_API_KEY", "tokenisdevtoken")
                }
            }
        };
    }

}

export default new Config();
