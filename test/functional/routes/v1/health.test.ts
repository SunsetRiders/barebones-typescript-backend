import HttpClientTest from "../../utility/http-client-test";
import { expect } from "chai";

const uri = "/api/v1/health";

describe(`GET ${uri}`, () => {

  context(`Test localhost server health`, () => {
    it(`GET ${uri}`, (done) => {
      HttpClientTest.call({
        uri,
        method: "GET"
      }).then(response => {
        expect(response.statusCode).to.eq(200);
        done();
      });
    });
  });

  context(`Test postgres microservice health`, () => {
    it(`GET ${uri}/postgres`, (done) => {
      HttpClientTest.call({
        uri: `${uri}/postgres`,
        method: "GET"
      }).then(response => {
        expect(response.statusCode).to.eq(200);
        done();
      });
    });
  });

});
