/**
 * Creates the pix_charges table
 * @param {import("pg").PoolClient} client The pool client
 */
export const up = async (client) => {
    const sql = /* sql */ `
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

    await client.query(sql)
    console.log('✓ Created pix_charges table')
}

/**
 * Drops the pix_charges table
 * @param {import("pg").PoolClient} client The pool client
 */
export const down = async (client) => {
    await client.query('DROP TABLE IF EXISTS pix_charges CASCADE')
    console.log('✓ Dropped pix_charges table')
}

export const description = 'Create pix_charges table'
