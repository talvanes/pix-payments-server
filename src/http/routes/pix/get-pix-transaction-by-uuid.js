import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Gets details of a PIX transaction by UUID
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getPixTransactionByUuidRoute(server) {
    server.get(
        '/:uuid',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
