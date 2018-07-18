import Repository from "./repository";
import { IConfig } from "../../lib/environment/i-config";
import { IRepositoryContext } from "../../layer/interface/i-repository";

class PksResourceRepository extends Repository {

    constructor(
        context: IRepositoryContext,
        config?: IConfig
    ) {
        super(context, config);
    }

}

export default PksResourceRepository;
