import confirmPaymentRoute from './confirm-payment'
import generateChargeRoute from './generate-charge'
import getPixTransactionByUuidRoute from './get-pix-transaction-by-uuid'
import getPixTransactionsByUserRoute from './get-pix-transactions-by-user'

/**
 * Pix routes for handling payment-related operations
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function pixRoutes(server) {
    server.register(generateChargeRoute)
    server.register(confirmPaymentRoute)
    server.register(getPixTransactionByUuidRoute)
    server.register(getPixTransactionsByUserRoute)
}
