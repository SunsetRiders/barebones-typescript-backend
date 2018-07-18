import Server from "./server";
import Config from "../environment/config";
import { IConfig } from "../environment/i-config";
import * as Logger from "logger";

class Api {

    private readonly server: Server;
    private readonly logger: Logger;
    private readonly config: IConfig;

    constructor(
        config: IConfig = Config.configFactory(),
        logger: Logger = Logger.newInstance(config.logs),
        server: Server =  new Server()
    ) {
        this.config = config;
        this.logger = logger;
        this.server = server;
    }

    public start(): Express.Application {
        // this.server.startDatabasePool(this.logger);
        this.server.loadMiddleware();
        const app = this.server.app.listen(this.config.server.port, () => {
            const startMessage = `[${this.config.server.name}] - Listening at http://localhost:${this.config.server.port}`;
            this.logger.info(startMessage);
            console.log(startMessage);
        });
        app.timeout = this.config.server.requestTimeout;
        return app;
    }

    public stop(): void {
        const stopMessage = `[${this.config.server.name}] - Stopping server at http://localhost:${this.config.server.port}`;
        this.logger.info(stopMessage);
        console.log(stopMessage);
        process.exit(0);
    }

}

export default Api;
