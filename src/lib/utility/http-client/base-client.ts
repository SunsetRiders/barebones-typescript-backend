import HttpRequest from "./http-request";
import { IHttpRequestObject, IHttpRequestContext } from "./i-http";

class BaseClient {

  protected readonly context: IHttpRequestContext;

  /**
   * @constructor
   * @param {IHttpRequestContext} context HTTP request context
   */
  constructor(context: IHttpRequestContext) {
    this.context = context;
  }

  /**
   * Repopulate context
   * @param {IHttpRequestContext} context HTTP request context
   */
  protected repopulateContext(context: IHttpRequestContext): void {
    this.context.port = context.port ? `:${context.port}` : "";
    this.context.host = `${context.host}${context.port}${context.version}`;
  }

  /**
   * Call the resource
   * @param {IHttpRequestObject} options Request
   * @return {Promise<any>} A promise object
   */
  public async call(options: IHttpRequestObject): Promise<any> {
    return await new HttpRequest(this.context).call({
      origin: options.origin,
      method: options.method,
      uri: options.uri,
      qs: ((options.qs) ? options.qs : {}),
      body: ((options.body) ? options.body : {}),
      headers: options.headers,
      json: true,
      resolveWithFullResponse: true,
      simple: false
    });
  }

}

export default BaseClient;
