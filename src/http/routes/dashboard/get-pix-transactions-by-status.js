/**
 * Get PIX transactions by status
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getChargesByStatusRoute(server) {
    server.get(
        '/charges/:status',
        {
            preHandler: [],
        },
        async (request, reply) => {
            //
        }
    )
}
