import { IFactory } from "../../interface/i-factory";
import * as Knex from "knex";
import * as KnexFile from "../../../../knexfile";
import * as Logger from "logger";

class PostgresConnectionFactory implements IFactory<Knex> {

    private readonly logger: Logger;

    constructor(
        logger: Logger
    ) {
        this.logger = logger;
    }

    public fabricate(params?: any): Knex {
        return Knex(KnexFile);
    }
}

export default PostgresConnectionFactory;
