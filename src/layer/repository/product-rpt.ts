import Repository from "./repository";
import { IRepository, IRepositoryParams, IRepositoryContext } from "./../interface/i-repository";
import Product from "./../entity/product";
import PostgresClientV2 from "../microservice/postgres-client-v2";

class ProductRPT extends Repository implements IRepository<Product> {

    /**
     * @constructor
     * @param {IRepositoryContext} context Repository context
     */
    constructor(context: IRepositoryContext) {
       super(context);
    }

    public async list(params?: IRepositoryParams): Promise<Product> {
        const postgresClientV2  = new PostgresClientV2({ logger: this.context.logger });
        return await postgresClientV2.listProducts();
    }

}

export default ProductRPT;
