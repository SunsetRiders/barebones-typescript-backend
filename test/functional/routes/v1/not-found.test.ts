import HttpClientTest from "../../utility/http-client-test";
import { expect } from "chai";
import Config from "../../../../src/lib/environment/config";

const uri = "/api";

describe(`GET ${uri}`, () => {
  it("returns 404 status code", (done) => {
    HttpClientTest.call({
      uri,
      method: "GET",
      headers: {
        api_key: Config.get("server.apiKey")
      }
    }).then(response => {
      expect(response.statusCode).to.eq(404);
      done();
    });
  });

});
