/**
 * Get recent changes
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function getRecentChangesRoute(server) {
    server.get(
        '/recent',
        {
            preHandler: [],
        },
        async (request, reply) => {
            //
        }
    )
}
