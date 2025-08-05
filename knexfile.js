// Update with your config settings.

const { env } = require('@/env')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'pg',
    connection: {
        host: env['DB_HOST'],
        port: env['DB_PORT'],
        database: env['DB_NAME'],
        user: env['DB_USER'],
        password: env['DB_PASSWORD'],
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
}
