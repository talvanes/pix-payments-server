/**
 * Login route for user authentication and creating new token
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function loginRoute(server) {
    server.post('/login', {}, async (request, reply) => {
        //
    })
}
