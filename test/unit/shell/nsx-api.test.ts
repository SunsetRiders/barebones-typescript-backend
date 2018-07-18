import * as Chai from "chai";
import OSShell from "../../../src/layer/shell/os-shell";
import NsxApi from "../../../src/layer/shell/nsx-api";
import * as Sinon from "sinon";
import * as ChaiAsPromised from "chai-as-promised";
import { IConfig } from "../../../src/lib/environment/i-config";
import Config from "../../../src/lib/environment/config";

describe.skip("NsxApi", ()  => {
  let osShell: OSShell = null;
  let nsxApi: NsxApi = null;
  let config: IConfig = null;
  const logger = {
    info: null,
    error: null
  };

  before(done => {
    Chai.use(ChaiAsPromised);
    config = Config.configFactory();
    logger.info = Sinon.spy();
    logger.error = Sinon.spy();
    osShell = new OSShell(logger);
    done();
  });

  context("call method nsxCleanupCluster()", ()  => {
    it("and return status code not zero", async (done) => {
      nsxApi = new NsxApi(osShell, config);
      const promiseResult = nsxApi.nsxCleanupCluster("clusterUUID").then(result => result.exitCode);
      Chai.expect(promiseResult).to.eventually.not.be.eq(0);
      done();
    });
  });
});
