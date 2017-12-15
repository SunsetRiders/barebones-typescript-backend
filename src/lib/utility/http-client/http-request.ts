import * as RequestPromise from "request-promise";
import { IHttpRequestObject } from "./i-http";

/**
 * Class to to handle HTTP requests to any web service.
 */
class HttpRequest {

  public req: any;
   public res: any;
   public host: string;
   private requestPromise: RequestPromise;

  /**
   * @constructor
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {String} host Resource's host
   */
  constructor(req, res, host: string) {
    this.req = req;
    this.res = res;
    this.host = host;
    this.requestPromise = RequestPromise;
  }

  /**
   * Add default metadata do request options
   * @param {Object} opts Options object
   * @return {Object} Options with default metadata
   */
  private defaultMetadata(opts: IHttpRequestObject): IHttpRequestObject {
    // X-Request-Id
    opts.headers["X-Request-Id"] = this.req.xRequestId;
    return opts;
  }

  /**
   * Mount options to request promise
   * @param {IHttpRequestObject} options Incomming options object
   * @return {IHttpRequestObject} Mounted options object to make the request
   */
  private mountOptions(options: IHttpRequestObject): IHttpRequestObject {
    // Default headers
    return this.defaultMetadata({
      uri: this.host + options.uri,
      method: ((options.method) ? options.method : "GET"),
      json: options.json,
      simple: options.simple,
      resolveWithFullResponse: options.resolveWithFullResponse,
      qs: ((options.qs) ? options.qs : {}),
      body: ((options.body) ? options.body : {}),
      headers: ((options.headers) ? options.headers : {})
    });
  }

  /**
   * Call the web resource
   * @param {IHttpRequestObject} options Incoming options object
   * @return {Promise<any>} Promise object
   */
  public async call(options: IHttpRequestObject): Promise<any> {
    if (!options.origin) {
      this.req.logger.warn("Missing options.origin, please fix this before sending it to production");
    }

    // Mount the options to make the request
    const opts = this.mountOptions(options);
    const request = Object.assign({origin: options.origin}, opts);

    /**
     * We will use some Bluebird's features (.tap(), .tapCatch()),
     * to be able to do that we need to call .promise() first, as described on:
     * https://github.com/request/request-promise/blob/18c838a1ba2e201cdb263a3ec41e0e66453c9c9c/lib/rp.js#L37
     */
    return await this.requestPromise(opts)
      .promise()
      .tap(response => {
        this.req.logger.info({
          request,
          response
        });
      })
      .tapCatch(error => {
        this.req.logger.error({
          request,
          error
        });
      });
  }
}

export default HttpRequest;
