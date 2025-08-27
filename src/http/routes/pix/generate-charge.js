/**
 * Generates a PIX charge
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function generateChargeRoute(server) {
    server.post(
        '/generate',
        {
            preHandler: [],
        },
        async (request, reply) => {
            //
        }
    )
}
