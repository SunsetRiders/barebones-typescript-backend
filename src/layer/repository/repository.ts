import Config from "../../lib/environment/config";
import { IConfig } from "../../lib/environment/i-config";
import { IRepositoryContext } from "../../layer/interface/i-repository";

abstract class Repository {

    protected readonly context: IRepositoryContext;
    protected readonly config: IConfig;

    constructor(
        context: IRepositoryContext,
        config: IConfig = Config.configFactory()
    ) {
        this.context = context;
        this.config = config;
    }

    protected async query(sql: string, params?: any): Promise<any> {
        return this.context.knex.raw(sql, params)
        .then(result => {
            this.context.logger.info({
                result,
                sql,
                params
            });
            return result;
        })
        .catch(err => {
            this.context.logger.error(err);
            throw err;
        });
    }
}

export default Repository;
