/**
 * User profile route for retrieving and managing user profile information
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function userProfileRoute(server) {
    server.get(
        '/profile',
        {
            preHandler: [],
        },
        async (request, reply) => {
            //
        }
    )
}
