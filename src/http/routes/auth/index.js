import loginRoute from './login'
import logoutRoute from './logout'
import registerRoute from './register'
import userProfileRoute from './user-profile'
import verifyTokenRoute from './verify-token'

/**
 * Auth routes for handling user authentication, authorization, and others
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function authRoutes(server) {
    server.register(registerRoute)
    server.register(loginRoute)
    server.register(logoutRoute)
    server.register(userProfileRoute)
    server.register(verifyTokenRoute)
}
