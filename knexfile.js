// Update with your config settings.

// https://whispering-tundra-30740.herokuapp.com/

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/brakumo'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
