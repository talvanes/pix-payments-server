/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const exists = await knex.schema.hasTable('pix_charges')
    if (!exists) {
        return knex.schema.createTable('pix_charges', function (table) {
            table.increments('id').primary()
            table.string('token', 255).notNullable().unique()
            table.integer('user_id').notNullable()
            table.decimal('amount', 10, 2).notNullable()
            table
                .string('status', 20)
                .defaultTo('generated')
                .checkIn(['generated', 'paid', 'cancelled'])
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('expires_at').notNullable()
            table.timestamp('paid_at').nullable()
            table
                .foreign('user_id')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
        })
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('pix_charges')
}
