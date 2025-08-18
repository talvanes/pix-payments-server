// pix.route.js

import PixController from '../controllers/PixController.js'
import checkRequestJWT from '../hooks/check-jwt-request.js'
import {
    pixChargeGenerationSchema,
    pixChargesDetailsSchema,
    pixPaymentConfirmationSchema,
    userPixChargeQueryingSchema,
} from '../schemas/pix.schema.js'

/**
 * PIX charge routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 */
async function pixRoutes(server) {
    const pixController = new PixController()

    // PIX charge generation endpoint (protected)
    server.post(
        '/generate',
        {
            preHandler: [checkRequestJWT],
            schema: pixChargeGenerationSchema,
        },
        pixController.generatePixCharge
    )

    // Payment confirmation endpoint (public endpoint for payment confirmation)
    server.patch(
        '/:token',
        {
            schema: pixPaymentConfirmationSchema,
        },
        pixController.confirmPixPayment
    )

    // PIX charge details endpoint (protected)
    server.get(
        '/:token',
        {
            preHandler: [checkRequestJWT],
            schema: pixChargesDetailsSchema,
        },
        pixController.getPixCharge
    )

    // User's PIX charge querying endpoint (protected)
    server.get(
        '/charges/list',
        {
            preHandler: [checkRequestJWT],
            schema: userPixChargeQueryingSchema,
        },
        pixController.getUserPixCharges
    )
}

export default pixRoutes
