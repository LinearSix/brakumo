// Update with your config settings.

// https://brakumo.herokuapp.com/

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/brakumo'
  },

  production: {
    client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'davie',
        password : '1DrumbasIsEnough!',
        database : 'brakumo',
        charset: 'utf8'
      },
      migrations: {
        directory: __dirname + '/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/knex/seeds'
      }
    }
};