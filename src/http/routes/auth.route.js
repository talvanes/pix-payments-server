// auth.route.js

import AuthController from '../controllers/AuthController.js'
import authenticatePlugin from '../plugins/authenticate.plugin.js'
import {
    tokenVerificationSchema,
    userLoginSchema,
    userLogoutSchema,
    userProfileSchema,
    userRegistrationSchema,
} from '../schemas/auth.schema.js'

/**
 * Authentication routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function authRoutes(server, options) {
    const authController = new AuthController()
    const authenticate = await authenticatePlugin(server)

    // User registration endpoint
    server.post(
        '/register',
        { schema: userRegistrationSchema },
        authController.registerUser
    )

    // User login endpoint
    server.post('/login', { schema: userLoginSchema }, authController.loginUser)

    // User logout endpoint
    server.post(
        '/logout',
        { schema: userLogoutSchema },
        authController.logoutUser
    )

    // Profile endpoint (protected)
    server.get(
        '/profile',
        { preHandler: [authenticate], schema: userProfileSchema },
        authController.getUserProfile
    )

    // Token verification endpoint (protected)
    server.get(
        '/verify',
        { preHandler: [authenticate], schema: tokenVerificationSchema },
        authController.verifyUserJwtToken
    )
}

export default authRoutes
