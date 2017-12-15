import * as RequestPromise from "request-promise";
import Config from "../../../src/lib/environment/config";
import { IHttpRequestObject } from "../../../src/lib/utility/http-client/i-http";

class HttpClientTest {

  public static baseUrl: string = `http://localhost:${Config.get("server.port")}`;

  public static async call(options: IHttpRequestObject): Promise<any> {
    return RequestPromise({
      uri: this.baseUrl + options.uri,
      method: ((options.method) ? options.method : "GET"),
      json: true,
      simple: false,
      resolveWithFullResponse: true,
      qs: ((options.qs) ? options.qs : {}),
      body: ((options.body) ? options.body : {}),
      headers: ((options.headers) ? options.headers : {})
    });
  }

}

export default HttpClientTest;
