import Api from "../../src//lib/core/api";

describe("Functional Tests", () => {

  const api: Api = new Api();
  api.start();

  after(done => {
    api.stop();
    done();
  });

  require("./routes/v1/health.test");
  require("./routes/v1/not-found.test");

});
