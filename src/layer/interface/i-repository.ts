import * as Knex from "knex";

export interface IRepositoryContext {
    logger: any;
    knex: Knex;
}
