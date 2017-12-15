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
   * Set default locals
   * @param {Request} cReq Current request
   * @param {Response} cRes Current response
   * @param {Response} msRes Microservice response
   */
  public setDefaultLocals(cReq, cRes, msRes): void {
    cRes.locals.status   = ((msRes && msRes.statusCode) ? msRes.statusCode : cRes.locals.status);
    cRes.locals.payload  = ((msRes && msRes.body && msRes.body.payload) ? msRes.body.payload : cRes.locals.payload);
    cRes.locals.metadata = ((msRes && msRes.body && msRes.body.metadata) ? msRes.body.metadata : cRes.locals.metadata);
    cRes.locals.errors   = ((msRes && msRes.body && msRes.body.errors) ? msRes.body.errors : cRes.locals.errors);
    cReq.logger.info({microServiceResponse: cRes.locals });
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
