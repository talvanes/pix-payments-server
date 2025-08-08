// dashboard.schema.js

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const dashboardStatisticsQueryingSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                stats: {
                    type: 'array',
                    items: { type: 'object' },
                },
                responseTime: { type: 'string' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const recentChargeQueryingSchema = {
    querystring: {
        type: 'object',
        properties: {
            limit: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const completeDashboardDataQueryingSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                dashboard: {
                    type: 'object',
                    properties: {
                        stats: {
                            type: 'array',
                            items: { type: 'object' },
                        },
                        recentCharges: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    token: { type: 'string', format: 'uuid' },
                                    amount: { type: 'number' },
                                    description: {
                                        type: 'string',
                                        nullable: true,
                                    },
                                    status: {
                                        type: 'string',
                                        enum: ['generated', 'paid', 'expired'],
                                    },
                                    createdAt: {
                                        type: 'string',
                                        nullable: true,
                                    },
                                    paidAt: { type: 'string', nullable: true },
                                    expiresAt: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responseTime: { type: 'string' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const chargesByStatusQueryingSchema = {
    params: {
        type: 'object',
        required: ['status'],
        properties: {
            status: {
                type: 'string',
                enum: ['generated', 'paid', 'expired'],
            },
        },
    },
    querystring: {
        type: 'object',
        properties: {
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
            offset: { type: 'integer', minimum: 0, default: 0 },
        },
    },
}
