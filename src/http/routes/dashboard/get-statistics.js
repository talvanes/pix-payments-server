/**
 * Get dashboard statistics
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getStatisticsRoute(server) {
    server.get(
        '/stats',
        {
            preHandler: [],
        },
        async (request, reply) => {
            //
        }
    )
}
