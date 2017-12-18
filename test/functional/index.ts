import Api from "../../src//lib/core/api";

const api: Api = new Api();
const promisesErrors = [];
api.start();

process.on("unhandledRejection", (err, promise) => {
  promisesErrors.push(promise);
});

process.on("exit", code => {
  console.log("\x1b[40m");
  console.log("\n>>> List of chai expectations errors...");
  console.log("\x1b[0m");
  if (promisesErrors.length > 0) {
    promisesErrors.forEach(err => {
      console.log("\x1b[31m", err);
    });
    console.log("\x1b[0m");
    process.exit(67); // Exit code 67 is for ELIFECYCLE
  } else {
    console.log("\x1b[32m", "All tests have passed! =)");
    console.log("\x1b[0m");
  }
});

describe("Functional Tests", () => {

  after(done => {
    api.stop();
    done();
  });

  require("./routes/v1/health.test");
  require("./routes/v1/not-found.test");

});
