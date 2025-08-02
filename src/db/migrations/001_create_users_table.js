/**
 * Creates the users table
 * @param {import("pg").PoolClient} client The pool client
 */
export const up = async (client) => {
    const sql = /* sql */ `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `.trim()

    await client.query(sql)
    console.log('✓ Created users table')
}

/**
 * Drops the users table
 * @param {import("pg").PoolClient} client The pool client
 */
export const down = async (client) => {
    await client.query('DROP TABLE IF EXISTS users CASCADE')
    console.log('✓ Dropped users table')
}

export const description = 'Create users table'
