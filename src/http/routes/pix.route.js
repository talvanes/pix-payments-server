// pix.route.js

import PixController from '@/http/controllers/PixController.js'
import authenticatePlugin from '@/http/plugins/authenticate.plugin.js'
import {
    pixChargeGenerationSchema,
    pixChargesDetailsSchema,
    pixPaymentConfirmationSchema,
    userPixChargeQueryingSchema,
} from '@/http/schemas/pix.schema.js'

/**
 * PIX charge routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function pixRoutes(server, options) {
    const pixController = new PixController()
    const authenticate = await authenticatePlugin(server)

    // PIX charge generation endpoint (protected)
    server.post(
        '/generate',
        {
            preHandler: [authenticate],
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
            preHandler: [authenticate],
            schema: pixChargesDetailsSchema,
        },
        pixController.getPixCharge
    )

    // User's PIX charge querying endpoint (protected)
    server.get(
        '/charges/list',
        {
            preHandler: [authenticate],
            schema: userPixChargeQueryingSchema,
        },
        pixController.getUserPixCharges
    )
}

export default pixRoutes
