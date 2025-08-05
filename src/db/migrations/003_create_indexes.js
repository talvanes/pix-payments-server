/**
 * Creates indexes for the pix_charges table
 * @param {import("pg").PoolClient} client The pool client
 */
export const up = async (client) => {
    const indexes = [
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_token ON pix_charges(token)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_user_id ON pix_charges(user_id)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_status ON pix_charges(status)',
        'CREATE INDEX IF NOT EXISTS idx_pix_charges_expires_at ON pix_charges(expires_at)',
    ]

    indexes.forEach(async (indexSql) => {
        try {
            await client.query(indexSql)
        } catch (err) {
            console.error(`Index creation error: ${err.message}`)
        }
    })

    console.log('✓ Created database indexes')
}

/**
 * Drops the indexes for pix_charges table
 * @param {import("pg").PoolClient} client The pool client
 */
export const down = async (client) => {
    const dropIndexes = [
        'DROP INDEX IF EXISTS idx_pix_charges_token',
        'DROP INDEX IF EXISTS idx_pix_charges_user_id',
        'DROP INDEX IF EXISTS idx_pix_charges_status',
        'DROP INDEX IF EXISTS idx_pix_charges_expires_at',
    ]

    dropIndexes.forEach(async (dropSql) => {
        try {
            await client.query(dropSql)
        } catch (err) {
            console.error(`Index drop error: ${err.message}`)
        }
    })

    console.log('✓ Dropped database indexes')
}

export const description = 'Create database indexes'
