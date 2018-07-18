import HttpRequest from "./http-request";
import { IHttpRequestObject, IHttpRequestContext } from "./i-http";
import Config from "../../environment/config";
import { IConfig } from "../../environment/i-config";

export class BaseClient {

  protected readonly context: IHttpRequestContext;
  protected readonly config: IConfig;

  /**
   * @constructor
   * @param {IHttpRequestContext} context HTTP request context
   */
  constructor(
    context: IHttpRequestContext,
    config: IConfig = Config.configFactory()
  ) {
     // Fix the last character in host
    if (context.host && context.host.slice(-1) === "/") {
      this.context.host = context.host.slice(0, -1);
    }

    // Add the first character in version
    if (context.version && context.version.charAt(0) !== "/") {
      this.context.version = `/${context.version}`;
    }

    this.context = context;
    this.config = config;
  }

  /**
   * Repopulate context
   * @param {IHttpRequestContext} context HTTP request context
   */
  protected repopulateContext(context: IHttpRequestContext): void {
    this.context.host = `${context.host}:${context.port}${context.version}`;
  }

  /**
   * Call the resource
   * @param {IHttpRequestObject} options Request
   * @return {Promise<any>} A promise object
   */
  protected async call(options: IHttpRequestObject): Promise<any> {
    return await new HttpRequest(this.context).call({
      origin: options.origin,
      method: options.method,
      uri: options.uri,
      qs: ((options.qs) ? options.qs : undefined),
      debug: ((typeof options.debug === "boolean") ? options.debug : false),
      body: ((options.body) ? options.body : undefined),
      form: ((options.form) ? options.form : undefined),
      formData: ((options.formData) ? options.formData : undefined),
      headers: options.headers,
      json: true,
      resolveWithFullResponse: true,
      simple: false
    });
  }

}

export interface IResponse<T> {
  body: T;
  statusCode: number;
  headers: any;
}
