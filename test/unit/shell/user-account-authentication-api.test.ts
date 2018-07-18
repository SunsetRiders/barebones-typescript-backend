import * as Chai from "chai";
import OSShell from "../../../src/layer/shell/os-shell";
import UserAccountAuthenticationApi from "../../../src/layer/shell/user-account-authentication-api";
import * as Sinon from "sinon";
import * as ChaiAsPromised from "chai-as-promised";
import { IConfig } from "../../../src/lib/environment/i-config";
import Config from "../../../src/lib/environment/config";

describe.skip("Class UserAccountAuthenticationApi", ()  => {

    let osShell: OSShell = null;
    let userAccountAuthenticationApi: UserAccountAuthenticationApi = null;
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

    context("call method targetPksResource()", ()  => {
        context("with success to", ()  => {
            it("target a valid resource", async (done) => {
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, config);
                const promiseResult = userAccountAuthenticationApi.targetPksResource().then(result => result.exitCode);
                Chai.expect(promiseResult).to.eventually.be.eq(0);
                done();
            });
        });
    });

    context("call method targetPksResource()", ()  => {
        context("with failure to", ()  => {
            it("target a valid resource", async (done) => {
                const clonedConfig: IConfig = Object.assign({}, config);
                clonedConfig.shell.pks.apiUrl  = "http://some-bad-url";
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, clonedConfig);
                const promiseResult = userAccountAuthenticationApi.targetPksResource().then(result => result.exitCode);
                Chai.expect(promiseResult).to.eventually.not.be.eq(0);
                done();
            });
        });
    });

    context("call method getUserToken()", ()  => {
        context("with success to", ()  => {
            it("get a valid user token", async (done) => {
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, config);
                const promiseResult = userAccountAuthenticationApi.getUserToken().then(result => result.exitCode);
                Chai.expect(promiseResult).to.eventually.be.eq(0);
                done();
            });
        });
    });

    context("call method getUserToken()", ()  => {
        context("with failure to", ()  => {
            it("get a valid user token", async (done) => {
                const clonedConfig: IConfig = Object.assign({}, config);
                clonedConfig.shell.uaa.uaaAdminSecret  = "some-bad-admin-secret";
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, clonedConfig);
                const promiseResult = userAccountAuthenticationApi.getUserToken().catch(result => result);
                Chai.expect(promiseResult).to.eventually.not.be.eq(0);
                done();
            });
        });
    });

    context("call method getUserInfo()", ()  => {
        context("with failure to", ()  => {
            it("get user info", async (done) => {
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, config);
                const promiseResult = userAccountAuthenticationApi.getUserInfo("bad-username").then(result => result.exitCode);
                Chai.expect(promiseResult).to.eventually.not.be.eq(0);
                done();
            });
        });
    });

    context("call method userExists()", ()  => {
        context("with failure to", ()  => {
            it("check if user exists", done => {
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, config);
                const promiseResult = userAccountAuthenticationApi.userExists("bad-username");
                Chai.expect(promiseResult).to.eventually.not.be.eq(true);
                done();
            });
        });
    });

    context("call method deleteUser()", ()  => {
        context("with failure to", ()  => {
            it("delete an user", done => {
                userAccountAuthenticationApi = new UserAccountAuthenticationApi(osShell, config);
                const promiseResult = userAccountAuthenticationApi.deleteUser("bad-username");
                Chai.expect(promiseResult).to.eventually.not.be.eq(true);
                done();
            });
        });
    });

});
