import { Migrator } from '@/db/migrator'
import { Pool } from 'pg'

class Database {
    constructor(host, database, user, password, port = 5432) {
        this.pool = new Pool({
            host,
            port,
            database,
            user,
            password,
            max: 20, // Maximum number of connections in the pool
            idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
            connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection
        })

        this.migrator = new Migrator(this.pool)
    }

    async initialize() {
        try {
            // Test the connection
            const client = await this.pool.connect()
            console.log('Connected to the database successfully')
            client.release()

            // Run migrations instead of creating tables directly
            await this.migrator.runMigrations()

            return Promise.resolve()
        } catch (err) {
            console.error('Error connecting to database:', err)
            return Promise.reject(err)
        }
    }

    // Generic query methods
    async run(sql, params = []) {
        const client = await this.pool.connect()
        try {
            const result = await client.query(sql, params)
            return {
                id: result.rows[0]?.id,
                changes: result.rowCount,
            }
        } finally {
            client.release()
        }
    }

    async get(sql, params = []) {
        const client = await this.pool.connect()
        try {
            const result = await client.query(sql, params)
            return result.rows[0]
        } finally {
            client.release()
        }
    }

    async all(sql, params = []) {
        const client = await this.pool.connect()
        try {
            const result = await client.query(sql, params)
            return result.rows
        } finally {
            client.release()
        }
    }

    async close() {
        await this.pool.end()
    }
}

export default Database
