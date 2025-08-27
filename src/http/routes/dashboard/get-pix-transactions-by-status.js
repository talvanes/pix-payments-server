import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Get PIX transactions by status
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getChargesByStatusRoute(server) {
    server.get(
        '/charges/:status',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
