/**
 * Confirms a PIX payment and processes the transaction
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function confirmPaymentRoute(server) {
    server.post('/:uuid', {}, async (request, reply) => {
        //
    })
}
