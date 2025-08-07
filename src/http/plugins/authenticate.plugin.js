// authenticate.plugin.js

/**
 * Authentication routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function authenticatePlugin(server, options) {
    /**
     * Authentication plugin
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    return (request, reply) => {
        const { headers, cookies } = request
        try {
            const token =
                headers.authorization?.replace('Bearer ', '') ||
                cookies['auth_token']

            if (!token) {
                throw new Error('No token provided')
            }

            const decoded = server.jwt.verify(token)
            request.user = decoded
        } catch (err) {
            reply.code(401).send({ error: 'Unauthorized' })
        }
    }
}

export default authenticatePlugin
