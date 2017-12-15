import BaseClient from "../../lib/utility/http-client/base-client";

/**
 * Client class to provide access to the EUC Portal API V2
 * @constructor
 */
class PostgresClientV2 extends BaseClient {

  /**
   * @constructor
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  constructor(req, res) {
    super(req, res, {
      port: global.app.config.get("microservice.postgres.port"),
      host: global.app.config.get("microservice.postgres.host"),
      version: "/api/v2"
    });
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

}

export default PostgresClientV2;
