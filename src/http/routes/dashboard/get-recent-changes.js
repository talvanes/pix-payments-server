import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Get recent changes
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getRecentChangesRoute(server) {
    server.get(
        '/recent',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
