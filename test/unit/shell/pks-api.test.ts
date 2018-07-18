import * as Chai from "chai";
import PKSApi from "../../../src/layer/shell/pks-api";
import * as Sinon from "sinon";
import * as ChaiAsPromised from "chai-as-promised";
import OSShell from "../../../src/layer/shell/os-shell";

describe.skip("PKSApi", ()  => {
  const logger = {info: Sinon.spy(), error: Sinon.spy()};
  const osShell: OSShell = new OSShell(logger);
  const pksAPi: PKSApi = new PKSApi(osShell);

  before(done => {
    Chai.use(ChaiAsPromised);
    done();
  });

  describe("login()", ()  => {
    context("with failure to", ()  => {
      it("execute a command", done => {
        const promiseResult = pksAPi.login("quibe", "quibe").then(result => result.exitCode);
        Chai.expect(promiseResult).to.eventually.not.be.eq(0);
        done();
      });
    });
  });
});
