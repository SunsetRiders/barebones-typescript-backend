export interface IHttpRequestObject {
  origin?: string;
  uri: string;
  method: string;
  qs?: object;
  body?: object;
  headers?: object;
  json?: boolean;
  simple?: boolean;
  resolveWithFullResponse?: boolean;
  debug?: boolean;
}

export interface IHttpRequestContext {
  host?: string;
  port?: string;
  version?: string;
  logger: any;
  xRequestId?: string;
}
