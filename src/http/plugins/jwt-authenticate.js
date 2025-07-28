/**
 * JWT authentication middleware.
 * @param {import("fastify/types/instance").FastifyInstance} fastifyServer - The Fastify server instance.
 */
export default async function jwtAuthenticate(fastifyServer) {
    /**
     * @param {import("fastify/types/request").FastifyRequest} request
     * @param {import("fastify/types/reply").FastifyReply} reply
     */
    return (request, reply) => {
        const { headers, cookies } = request
        try {
            const token =
                headers.authorization?.replace('Bearer ', '') ||
                cookies.auth_token

            if (!token) {
                throw new Error('No token provided')
            }

            const decoded = fastifyServer.jwt.verify(token)
            request.user = decoded
        } catch (err) {
            reply.code(401).send({ error: 'Unauthorized' })
        }
    }
}
