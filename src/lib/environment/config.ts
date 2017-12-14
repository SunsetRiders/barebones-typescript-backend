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
                name: GetEnv.string("SERVER_NAME", "ts-backend"),
                version: GetEnv.string("SERVER_VERSION", "1.0.0"),
                nodeEnv: GetEnv.string("NODE_ENV", "development"),
                port: GetEnv.int("SERVER_PORT", 3000),
                acceptable: GetEnv.array("SERVER_ACCEPTABLE", "string", ["application/json"]),
                dirRoot
            },
            logs: {
                transports: GetEnv.array("LOGS_TRANSPORTS", "string", ["console"]),
                log: GetEnv.string("LOG_LEVEL"),
                logentriesToken: GetEnv.string("LOGS_LOGENTRIES_TOKEN"),
                logPath: Path.resolve(dirRoot, "./log")
            }
        };
    }

}

export default new Config();
