/*
  Example migration schema to use with knex
*/

/*
exports.up = (knex, Promise) => {
  return knex.schema.withSchema('public')
    .createTable('pks_resources', t => {
      t.increments('id').unsigned().primary();
      t.string('td_username').nullable();
      t.string('pks_username').notNull();
      t.string('pks_password').notNull();
      t.string('pks_email').notNull();
      t.integer('status').notNull();
      t.timestamp('provisioning_at').defaultTo(knex.fn.now());
      t.timestamp('provisioned_at').nullable();
      t.dateTime('bound_at').nullable();
      t.dateTime('deprovisioning_at').nullable();
      t.dateTime('deprovisioned_at').nullable();
      t.index(["td_username", "pks_username", "pks_email", "status"]);
    });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema('public').dropTable('pks_resources');
};
*/