import HttpClientTest from "../../utility/http-client-test";
import { expect } from "chai";

const uri = "/api";

describe(`GET ${uri}`, () => {
  it("returns 404 status code", (done) => {
    HttpClientTest.call({
      uri,
      method: "GET"
    }).then(response => {
      expect(response.statusCode).to.eq(404);
      done();
    });
  });

});
