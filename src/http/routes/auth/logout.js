/**
 * User logout route for ending user sessions
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function logoutRoute(server) {
    server.post('/logout', {}, async (request, reply) => {
        //
    })
}
