// tests/setup.js

import { buildServer } from '../src/server.js'

/**
 * Global test setup
 * @type {import('fastify').FastifyInstance}
 */
let server

/**
 * Setup function run before all tests
 */
global.beforeAll(async () => {
    server = await buildServer()
    global.server = server
})

/**
 * Cleanup function run after all tests
 */
global.afterAll(async () => {
    await server.close()
})

/**
 * Reset database state before each test
 */
global.beforeEach(async () => {
    // Add any database cleanup/seeding here if needed
    // await server.knex.migrate.rollback()
    // await server.knex.migrate.latest()
})
