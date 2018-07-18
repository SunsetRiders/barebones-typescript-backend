const Api = require("../dist/lib/core/api.js").default;
const Config = require("../dist/lib/environment/config").default;
const Logger = require("logger");

const config = Config.configFactory();
process.env.NODE_ENV = config.server.nodeEnv;
process.env.TZ = "UTC";
const logger = Logger.newInstance(config.logs);

try {
  const api = new Api(); 
  api.start();
} catch(err) {
  logger.error(err);
}
