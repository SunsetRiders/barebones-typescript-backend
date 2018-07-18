export interface IHttpRequestObject {
  origin?: string;
  uri: string;
  method: string;
  qs?: object;
  body?: object;
  form?: object;
  formData?: object;
  headers?: object;
  json?: boolean;
  simple?: boolean;
  resolveWithFullResponse?: boolean;
  debug?: boolean;
}

export interface IHttpRequestContext {
  host?: string;
  port?: number;
  version?: string;
  logger: any;
  xRequestId?: string;
}
