import HttpClientTest from "../../utility/http-client-test";
import { expect } from "chai";
import Config from "../../../../src/lib/environment/config";

const config = Config.configFactory();

const uri = "/api";

describe(`GET ${uri}`, () => {
  it("returns 404 status code", (done) => {
    HttpClientTest.call({
      uri,
      method: "GET",
      headers: {
        api_key: config.server.apiKey
      }
    }).then(response => {
      expect(response.statusCode).to.eq(404);
      done();
    });
  });

});
