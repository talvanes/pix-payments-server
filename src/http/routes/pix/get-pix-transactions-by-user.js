import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Gets user's PIX transactions
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getPixTransactionsByUserRoute(server) {
    server.get(
        '/charges/list',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
