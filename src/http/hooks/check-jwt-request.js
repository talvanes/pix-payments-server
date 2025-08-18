import jwt from 'jsonwebtoken'
import { env } from '../../env.js'

/**
 * Check JWT request
 * @param {import("fastify/types/request").FastifyRequest} request Request object
 * @param {import("fastify/types/reply").FastifyReply} reply Reply object
 */
async function checkJWTRequest(request, reply) {
    const { headers, cookies } = request
    try {
        const token =
            headers.authorization?.replace('Bearer ', '') ||
            cookies['auth_token']

        if (!token) {
            throw new Error('No token provided')
        }

        const payload = jwt.verify(token, {
            secret: env['JWT_SECRET'],
            algorithms: ['HS512'],
            expiresIn: '1h',
        })
        request.user = payload
    } catch {
        reply.code(401).send()
    }
}

export default checkJWTRequest
