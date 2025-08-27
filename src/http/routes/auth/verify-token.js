import authenticateJwtRequest from 'src/http/hooks/authenticate-jwt-request'

/**
 * User token verification route for validating and managing user authentication
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function verifyTokenRoute(server) {
    server.get(
        '/verify',
        {
            preHandler: [authenticateJwtRequest],
        },
        async (request, reply) => {
            //
        }
    )
}
