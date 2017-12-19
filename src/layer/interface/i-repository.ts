export interface IRepositoryContext {
    logger: any;
}

export interface IRepositoryParams {
    limit?: number;
    page?: number;
    term?: number;
}

export interface IRepository<T> {
    list(params?: IRepositoryParams): Promise<T>;
}
