// auth.route.js

import AuthController from '../controllers/AuthController.js'

const registerSchema = {}
const registerResponseSchema = {}

const loginSchema = {}
const loginResponseSchema = {}

/**
 * Authentication routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function authRoutes(server, options) {
    const authController = new AuthController()

    // User registration endpoint
    server.post(
        '/register',
        {
            schema: {
                body: registerSchema,
                response: { 201: registerResponseSchema },
            },
        },
        authController.registerUser
    )

    // User login endpoint
    server.post(
        '/login',
        {
            schema: {
                body: loginSchema,
                response: { 200: loginResponseSchema },
            },
        },
        authController.loginUser
    )

    // User logout endpoint
    server.post('/logout', authController.logoutUser)

    // Profile endpoint (protected)
    server.get(
        '/profile',
        { preHandler: [server.authenticate] },
        authController.getUserProfile
    )

    // Token verification endpoint (protected)
    server.get(
        '/verify',
        { preHandler: [server.authenticate] },
        authController.verifyUserJwtToken
    )
}

export default authRoutes
