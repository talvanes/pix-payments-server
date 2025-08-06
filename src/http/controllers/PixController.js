export default class PixController {
    constructor() {}

    /**
     * Generate a new PIX charge
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async generatePixCharge(request, reply) {}

    /**
     * Confirm a PIX payment
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async confirmPixPayment(request, reply) {}

    /**
     * Get a PIX charge
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getPixCharge(request, reply) {}

    /**
     * Get all PIX charges for a user
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getUserPixCharges(request, reply) {}

    // Method to start a scheduler for expiring PIX charges
    startExpirationScheduler() {}
}
