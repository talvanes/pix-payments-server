import { migrations } from './migrations/index.js'

function getMigrationTrackingTableCreationSQL() {
    return /* sql */ `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id VARCHAR(255) PRIMARY KEY,
      description TEXT,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`.trim()
}

export class Migrator {
    constructor(pool) {
        this.pool = pool
    }

    async initialize() {
        const client = await this.pool.connect()
        try {
            // Create migrations tracking table
            await client.query(getMigrationTrackingTableCreationSQL())
        } finally {
            client.release()
        }
    }

    /**
     * Get a list of executed migration IDs
     * @returns {Promise<string[]>} List of executed migration IDs
     */
    async getExecutedMigrations() {
        const client = await this.pool.connect()
        try {
            const result = await client.query(
                'SELECT id FROM schema_migrations ORDER BY id'
            )
            return result.rows.map((row) => row.id)
        } finally {
            client.release()
        }
    }

    /**
     * Run all pending migrations in order
     */
    async runMigrations() {
        await this.initialize()
        const executed = await this.getExecutedMigrations()
        const client = await this.pool.connect()

        try {
            await client.query('BEGIN')

            for (const migration of migrations) {
                if (!executed.includes(migration.id)) {
                    console.log(
                        `Running migration ${migration.id}: ${migration.description}`
                    )

                    await migration.up(client)

                    await client.query(
                        'INSERT INTO schema_migrations (id, description) VALUES ($1, $2)',
                        [migration.id, migration.description]
                    )

                    console.log(`✓ Migration ${migration.id} completed`)
                }
            }

            await client.query('COMMIT')
            console.log('All migrations completed successfully')
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Migration failed:', error)
            throw error
        } finally {
            client.release()
        }
    }

    /**
     * Rollback the database to a previous migration state
     * @param {string|null} targetMigration The ID of the migration to rollback to, or null to rollback the last migration
     */
    async rollback(targetMigration = null) {
        const executed = await this.getExecutedMigrations()
        const client = await this.pool.connect()

        try {
            await client.query('BEGIN')

            // Rollback migrations in reverse order
            const toRollback = targetMigration
                ? executed.filter((id) => id > targetMigration)
                : [executed[executed.length - 1]] // Just last one if no target

            for (const migrationId of toRollback.reverse()) {
                const migration = migrations.find((m) => m.id === migrationId)
                if (migration) {
                    console.log(
                        `Rolling back migration ${migration.id}: ${migration.description}`
                    )

                    await migration.down(client)

                    await client.query(
                        'DELETE FROM schema_migrations WHERE id = $1',
                        [migration.id]
                    )

                    console.log(`✓ Migration ${migration.id} rolled back`)
                }
            }

            await client.query('COMMIT')
            console.log('Rollback completed successfully')
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Rollback failed:', error)
            throw error
        } finally {
            client.release()
        }
    }
}
