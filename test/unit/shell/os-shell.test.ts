import * as Chai from "chai";
import OSShell from "../../../src/layer/shell/os-shell";
import * as Sinon from "sinon";
import * as ChaiAsPromised from "chai-as-promised";

describe("OSShell", ()  => {

    let osShell: OSShell = null;
    const logger = {
        info: null,
        error: null
    };

    before(done => {
        Chai.use(ChaiAsPromised);
        logger.info = Sinon.spy();
        logger.error = Sinon.spy();
        osShell = new OSShell(logger);
        done();
    });

    describe("execute()", ()  => {
        context("with success to", ()  => {
            it("execute a command", done => {
                const promiseResult = osShell.execute("ls").then(result => result.exitCode);
                Chai.expect(promiseResult).to.eventually.be.eq(0);
                done();
            });
        });

        context("with failure to", ()  => {
            it("execute a command", done => {
                const promiseResult = osShell.execute("**bad-command**").catch(result => result);
                Chai.expect(promiseResult).to.eventually.not.be.eq(0);
                done();
            });
        });
    });
});
