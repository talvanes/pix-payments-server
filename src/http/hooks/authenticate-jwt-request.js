import jwt from 'jsonwebtoken'
import { env } from '../../env'

/**
 * Authenticates a JWT request to ensure the user is authorized
 * @param {import("fastify").FastifyRequest} request The incoming request object
 * @param {import("fastify").FastifyReply} reply The reply object
 */
export default async function authenticateJwtRequest(request, reply) {
    const token =
        request.headers['authorization']?.replace('Bearer ', '') ||
        request.cookies['auth_token']

    if (!token) {
        return reply.status(401).send()
    }

    try {
        const payload = jwt.verify(token, env['JWT_SECRET'])
        request.user = payload
    } catch {
        return reply.status(401).send()
    }
}
