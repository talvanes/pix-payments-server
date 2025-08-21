/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.table('pix_charges', function (table) {
        table.index('token', 'idx_pix_charges_token')
        table.index('user_id', 'idx_pix_charges_user_id')
        table.index('status', 'idx_pix_charges_status')
        table.index('expires_at', 'idx_pix_charges_expires_at')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.table('pix_charges', function (table) {
        table.dropIndex('token', 'idx_pix_charges_token')
        table.dropIndex('user_id', 'idx_pix_charges_user_id')
        table.dropIndex('status', 'idx_pix_charges_status')
        table.dropIndex('expires_at', 'idx_pix_charges_expires_at')
    })
}
