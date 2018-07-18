import Config from "../../lib/environment/config";
import { IConfig } from "../../lib/environment/i-config";

abstract class UseCase {

    protected readonly logger;
    protected readonly config: IConfig;

    constructor(
        logger,
        config: IConfig = Config.configFactory()
    ) {
        this.logger = logger;
        this.config = config;
    }

}

export default UseCase;
