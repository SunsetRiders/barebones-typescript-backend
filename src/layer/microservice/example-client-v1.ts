import BaseClient from "../../lib/utility/http-client/base-client";
import { IHttpRequestContext } from "../../lib/utility/http-client/i-http";

/**
 * Client class to provide access to the Example
 * @constructor
 */
class ExampleClientV1 extends BaseClient {

  /**
   * @constructor
   * @param {IHttpRequestContext} context Http request object
   */
  constructor(context: IHttpRequestContext) {
    super(context);
    // this.context.port = global.app.config.get("microservice.example.port");
    // this.context.host = global.app.config.get("microservice.example.host");
    this.context.version = "/api/v1";
    super.repopulateContext(this.context);
  }

  /**
   * Call the resource
   * @param {Any} options Request
   * @return {Promise<any>} A promise object
   */
  public async call(options): Promise<any> {
    return await super.call(Object.assign(options, {
      origin: "ExampleClientV1" + options.origin,
      headers: Object.assign(options.headers || {}, {
        // Add default header here
      })
    }));
  }

  /**
   * Health
   * @return {Promise<any>} Returns a promise
   */
  public async health(): Promise<any> {
    return await this.call({
      origin: "#health",
      method: "GET",
      uri: "/health"
    });
  }

}

export default ExampleClientV1;
