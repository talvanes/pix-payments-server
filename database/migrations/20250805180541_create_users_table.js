/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const exists = await knex.schema.hasTable('users')
    if (!exists) {
        return knex.schema.createTable('users', function (table) {
            table.increments('id').primary()
            table.string('email', 255).notNullable().unique()
            table.string('password', 255).notNullable()
            table.string('name', 255).notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('users')
}
