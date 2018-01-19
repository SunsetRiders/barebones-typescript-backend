export interface IRepositoryContext {
    logger: any;
}

export interface IRepositoryParams {
    filters?: any;
    payload?: any;
    limit?: number;
    page?: number;
    term?: string;
}

export interface IRepository<T> {
    read(params?: IRepositoryParams): Promise<T>;
    list(params?: IRepositoryParams): Promise<T[]>;
}
