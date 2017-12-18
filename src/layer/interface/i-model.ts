export interface IModel {
    validateRequest(obj: any): any;
    getValidationSchema(): object;
}
