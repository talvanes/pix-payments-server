import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Get complete dashboard data
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getCompleteDashboardDataRoute(server) {
    server.get(
        '/',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
