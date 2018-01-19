import Repository from "./repository";
import { IRepository, IRepositoryParams, IRepositoryContext } from "./../interface/i-repository";

// Entities
import Example from "../entity/example";

class ExampleRPT extends Repository implements IRepository<Example> {

    /**
     * @constructor
     * @param {IRepositoryContext} context Repository context
     */
    constructor(context: IRepositoryContext) {
       super(context);
    }

    public async read(params?: IRepositoryParams): Promise<Example> {
        throw new Error("Method not implemented.");
    }

    public async list(params?: IRepositoryParams): Promise<Example[]> {
        throw new Error("Method not implemented.");
    }

}

export default ExampleRPT;
