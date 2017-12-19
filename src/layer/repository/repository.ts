import { IRepositoryContext } from "./../interface/i-repository";

abstract class Repository {

    protected context: IRepositoryContext;

   /**
    * @constructor
    * @param {IRepositoryContext} context Repository context
    */
    constructor(context: IRepositoryContext) {
        this.context = context;
    }

}

export default Repository;
