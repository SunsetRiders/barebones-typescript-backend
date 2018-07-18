import * as RequestPromise from "request-promise";
import Config from "../../../src/lib/environment/config";
import { IHttpRequestObject } from "../../../src/lib/utility/http-client/i-http";

const config = Config.configFactory();

class HttpClientTest {

  public static baseUrl: string = `http://localhost:${config.server.port}`;

  public static async call(options: IHttpRequestObject): Promise<any> {
    const parsedOptions = {
      uri: HttpClientTest.baseUrl + options.uri,
      method: ((options.method) ? options.method : "GET"),
      json: true,
      simple: false,
      resolveWithFullResponse: true,
      qs: ((options.qs) ? options.qs : {}),
      body: ((options.body) ? options.body : {}),
      headers: ((options.headers) ? options.headers : {})
    };

    if (options.debug) {
      console.log(parsedOptions);
    }
    return RequestPromise(parsedOptions);
  }

}

export default HttpClientTest;
