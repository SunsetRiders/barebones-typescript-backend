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
}

export interface IBaseClientObject {
  host: string;
  port: string;
  version: string;
}
