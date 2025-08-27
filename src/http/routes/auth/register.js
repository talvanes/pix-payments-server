/**
 * User registration route for creating new user accounts
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function registerRoute(server) {
    server.post('/register', {}, async (request, reply) => {
        //
    })
}
