export interface IFactory<T> {
    fabricate(params?: any): T;
}
