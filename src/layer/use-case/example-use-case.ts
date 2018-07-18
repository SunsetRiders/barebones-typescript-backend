import { IUseCase } from "../interface/i-use-case";
import Config from "../../lib/environment/config";
import { IConfig } from "../../lib/environment/i-config";
import * as Logger from "logger";
import UseCase from "./use-case";

class ExampleUseCase extends UseCase implements IUseCase {

    constructor(
        logger: Logger,
        config?: IConfig
    ) {
        super(logger, config);
    }
    public async execute(params: { tdUsername: string }): Promise<void> {
        return;
    }

}

export default ExampleUseCase;
