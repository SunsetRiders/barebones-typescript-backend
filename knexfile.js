const Config = require("./dist/lib/environment/config").default;

class KnexFile {

  static get(config = Config.configFactory()) {
    return {
      client: 'postgresql',
      connection: config.database.postgres.connectionUrl,
      pool: {
        min: config.database.postgres.min,
        max: config.database.postgres.max
      },
      migrations: {
        directory: './db/migrations',
        tableName: 'vmtd-pks-service_migrations'
      },
      seeds: {
        directory: './db/seeds',
        tableName: 'vmtd-pks-service-seeds'
      }
    };
  }
}

module.exports = KnexFile.get();