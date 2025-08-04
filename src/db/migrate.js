#!/usr/bin/env node

import { env } from '@/env.js'
import { Pool } from 'pg'
import { Migrator } from './migrator.js'

const pool = new Pool({
    host: env['DB_HOST'],
    port: env['DB_PORT'],
    database: env['DB_NAME'],
    user: env['DB_USER'],
    password: env['DB_PASSWORD'],
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const migrator = new Migrator(pool)

async function main() {
    const [, , command, arg] = process.argv

    try {
        if (command === 'up') {
            await migrator.runMigrations()
        } else if (command === 'down') {
            await migrator.rollback(arg)
        } else if (command === 'status') {
            const executed = await migrator.getExecutedMigrations()
            console.log('Executed migrations:', executed)
        } else if (command === 'init') {
            await migrator.initialize()
            console.log('Initialized migration schema successfully!')
        } else {
            console.log(
                'Usage: node db/migrate.js <up|down|status|init> [target_migration_id]'
            )
        }
    } catch (err) {
        console.error('Migration error:', err)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

main()
