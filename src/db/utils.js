/**
 * Utility function for creating necessary database tables.
 * @param {import('pg').Pool} pool - The PostgreSQL database instance.
 * @throws Will throw an error if table creation fails.
 * @returns {Promise<void>}
 */
export async function createTables(pool) {
    const createUsersTable = /* sql */ `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `.trim()

    const createPixChargesTable = /* sql */ `
    CREATE TABLE IF NOT EXISTS pix_charges (
      id SERIAL PRIMARY KEY,
      token VARCHAR(255) UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      description TEXT,
      status VARCHAR(20) DEFAULT 'generated' CHECK (status IN ('generated', 'paid', 'expired')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL,
      paid_at TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
    `.trim()

    const createIndexes = [
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_token ON pix_charges(token)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_user_id ON pix_charges(user_id)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_status ON pix_charges(status)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_expires_at ON pix_charges(expires_at)',
    ]

    const client = await pool.connect()

    try {
        await Promise.allSettled([
            client.query(createUsersTable),
            client.query(createPixChargesTable),
        ])

        for (const indexSql of createIndexes) {
            try {
                await client.query(indexSql)
            } catch (err) {
                console.error('Index creation error:', err)
            }
        }
    } finally {
        client.release()
    }
}
