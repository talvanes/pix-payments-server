import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Get dashboard statistics
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getStatisticsRoute(server) {
    server.get(
        '/stats',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
