// Update with your config settings.

import { env } from './src/env'

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
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
        tableName: 'schema_migrations',
        directory: './db/migrations',
        createSchema: true,
    },
}
