import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * Generates a PIX charge
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function generateChargeRoute(server) {
    server.post(
        '/generate',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
