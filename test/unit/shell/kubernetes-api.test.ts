import * as Chai from "chai";
import OSShell from "../../../src/layer/shell/os-shell";
import KubernetesApi from "../../../src/layer/shell/kubernetes-api";
import * as Sinon from "sinon";
import * as ChaiAsPromised from "chai-as-promised";
import { IConfig } from "../../../src/lib/environment/i-config";
import Config from "../../../src/lib/environment/config";

describe.skip("KubernetesApi", ()  => {
  let osShell: OSShell = null;
  let kubernetesApi: KubernetesApi = null;
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

  context("call method listClusterInfo()", ()  => {
    it("and return status code not zero", async (done) => {
      kubernetesApi = new KubernetesApi(osShell, config);
      const promiseResult = kubernetesApi.listClusterInfo().then(result => result.exitCode);
      Chai.expect(promiseResult).to.eventually.not.be.eq(0);
      done();
    });
  });

  context("call method deleteResources()", ()  => {
    it("and return status code not zero", async (done) => {
      kubernetesApi = new KubernetesApi(osShell, config);
      const promiseResult = kubernetesApi.deleteResources().then(result => result.exitCode);
      Chai.expect(promiseResult).to.eventually.not.be.eq(0);
      done();
    });
  });
});
