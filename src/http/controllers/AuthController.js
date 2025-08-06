export default class AuthController {
    constructor() {}

    /**
     * User registration
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async registerUser(request, reply) {}

    /**
     * User login
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async loginUser(request, reply) {}

    /**
     * User logout
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async logoutUser(request, reply) {}

    /**
     * Get user profile
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async getUserProfile(request, reply) {}

    /**
     * Verify user email
     * @param {import("fastify/types/request").FastifyRequest} request Request object
     * @param {import("fastify/types/reply").FastifyReply} reply Reply object
     */
    async verifyUserJwtToken(request, reply) {}
}
