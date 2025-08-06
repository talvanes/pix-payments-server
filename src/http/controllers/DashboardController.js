export default class DashboardController {
    constructor() {}

    /**
     * Get dashboard statistics
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getDashboardStats(request, reply) {}

    /**
     * Get recent PIX charges
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getRecentPixCharges(request, reply) {}

    /**
     * Get dashboard data
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getDashboardData(request, reply) {}

    /**
     * Get PIX charges by status
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getChargesByStatus(request, reply) {}
}
