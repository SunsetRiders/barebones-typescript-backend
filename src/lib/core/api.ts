import Server from "./server";
import Config from "../environment/config";
import * as Logger from "logger";

class Api {

    private readonly server: Server;
    private readonly logger: Logger;

    constructor() {
        // Set global config
        global.app = {
            config: Config
        };
        this.logger = Logger.newInstance(global.app.config.get("logs"));
        this.server = new Server();
    }

    public start(): Server {
        return this.server.app.listen(global.app.config.get("server.port"), () => {
            const startMessage = `[${global.app.config.get("server.name")}] - Listening at http://localhost:${global.app.config.get("server.port")}`;
            this.logger.info(startMessage);
            console.log(startMessage);
        });
    }

    public stop(): void {
        const stopMessage = `[${global.app.config.get("server.name")}] - Stopping server at http://localhost:${global.app.config.get("server.port")}`;
        this.logger.info(stopMessage);
        console.log(stopMessage);
        process.exit(0);
    }

}

export default Api;
