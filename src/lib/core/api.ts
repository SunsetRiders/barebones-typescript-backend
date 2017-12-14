import Server from "./server";
import Config from "../environment/config";
import Chalk from "chalk";

class Api {

    private readonly server: Server;

    constructor() {
        // Set global config
        global.app = {
            config: Config
        };

        this.server = new Server();
    }

    public start(): Server {
        // Listen
        return this.server.app.listen(global.app.config.get("server.port"), () => {
            console.log(Chalk.blue(`[${global.app.config.get("server.name")}] - Listening at http://localhost:${global.app.config.get("server.port")}`));
        });
    }

    public static stop(): void {
        process.exit(0);
    }

}

export default new Api().start();
