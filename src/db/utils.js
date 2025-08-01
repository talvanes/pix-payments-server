/**
 * Utility function for creating necessary database tables.
 * @param {import('pg').Pool} db - The PostgreSQL database instance.
 * @throws Will throw an error if table creation fails.
 * @returns {Promise<void>}
 */
export async function createTables(db) {
    const createUsersTable = /* sql */ `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `.trim()

    const createPixChargesTable = /* sql */ `
    CREATE TABLE IF NOT EXISTS pix_charges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'paid', 'expired')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      paid_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
    `.trim()

    const createIndexes = [
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_token ON pix_charges(token)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_user_id ON pix_charges(user_id)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_status ON pix_charges(status)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_expires_at ON pix_charges(expires_at)',
    ]

    return new Promise((resolve, reject) => {})
}
