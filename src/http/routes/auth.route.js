// auth.route.js

import AuthController from '../controllers/AuthController.js'
import checkRequestJWT from '../hooks/check-jwt-request.js'
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
 */
async function authRoutes(server) {
    const authController = new AuthController()

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
        { preHandler: [checkRequestJWT], schema: userProfileSchema },
        authController.getUserProfile
    )

    // Token verification endpoint (protected)
    server.get(
        '/verify',
        { preHandler: [checkRequestJWT], schema: tokenVerificationSchema },
        authController.verifyUserJwtToken
    )
}

export default authRoutes
