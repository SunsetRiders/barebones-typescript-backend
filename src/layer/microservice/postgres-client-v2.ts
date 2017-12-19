import BaseClient from "../../lib/utility/http-client/base-client";
import { IHttpRequestContext } from "../../lib/utility/http-client/i-http";

/**
 * Client class to provide access to the EUC Portal API V2
 * @constructor
 */
class PostgresClientV2 extends BaseClient {

  /**
   * @constructor
   * @param {IHttpRequestContext} context Http request object
   */
  constructor(context: IHttpRequestContext) {
    super(context);
    this.context.port = global.app.config.get("microservice.postgres.port");
    this.context.host = global.app.config.get("microservice.postgres.host");
    this.context.version = "/api/v2";
    super.repopulateContext(this.context);
  }

  /**
   * Call the resource
   * @param {Any} options Request
   * @return {Promise<any>} A promise object
   */
  public async call(options): Promise<any> {
    return await super.call(Object.assign(options, {
      origin: "PostgresService" + options.origin,
      headers: Object.assign(options.headers || {}, {
        api_key: global.app.config.get("microservice.postgres.apiKey")
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

  /**
   * List products
   * @return {Promise<any>} Returns a promise
   */
  public async listProducts(): Promise<any> {
    return await this.call({
      origin: "#listProducts",
      method: "GET",
      uri: "/products"
    });
  }
}

export default PostgresClientV2;
