const config = require('./.config');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: config.db.connection.host,
      user: config.db.connection.user,
      password: config.db.connection.password,
      database: config.db.connection.database
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: config.db.connection.host,
      user: config.db.connection.user,
      password: config.db.connection.password,
      database: config.db.connection.database
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};
