import HttpRequest from "./http-request";
import { IHttpRequestObject, IBaseClientObject } from "./i-http";

class BaseClient {

  public req: any;
  public res: any;
  public host: string;
  public port: string;
  public httpRequest: HttpRequest;

  /**
   * @constructor
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {IBaseClientObject} options Options object
   */
  constructor(req, res, options: IBaseClientObject) {
    this.req = req;
    this.res = res;
    this.port = options.port ? `:${options.port}` : "";
    this.httpRequest = new HttpRequest(
      this.req,
      this.res,
      `${options.host}${this.port}${options.version}`
    );
  }

  /**
   * Call the resource
   * @param {IHttpRequestObject} options Request
   * @return {Promise<any>} A promise object
   */
  public async call(options: IHttpRequestObject): Promise<any> {
    return await this.httpRequest.call({
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
