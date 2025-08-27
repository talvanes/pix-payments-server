/**
 * Get complete dashboard data
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getCompleteDashboardDataRoute(server) {
    server.get(
        '/',
        {
            preHandler: [],
        },
        async (request, reply) => {
            //
        }
    )
}
