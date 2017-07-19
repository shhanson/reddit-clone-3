module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'reddit-clone',
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'reddit-clone-test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'reddit-clone-production',
  },

};
