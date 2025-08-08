// pix.schema.js

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const pixChargeGenerationSchema = {
    body: {
        type: 'object',
        required: ['amount'],
        properties: {
            amount: { type: 'number', minimum: 0.01, maximum: 999999.99 },
            description: { type: 'string', maxLength: 255 },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                success: { const: true },
                message: { type: 'string' },
                pixChargeId: { type: 'integer' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const pixPaymentConfirmationSchema = {
    params: {
        type: 'object',
        required: ['token'],
        properties: {
            token: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                message: { type: 'string' },
                status: { const: 'paid' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const pixChargesDetailsSchema = {
    params: {
        type: 'object',
        required: ['token'],
        properties: {
            token: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                charge: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', format: 'uuid' },
                        amount: { type: 'number' },
                        description: { type: 'string', nullable: true },
                        status: {
                            type: 'string',
                            enum: ['generated', 'paid', 'expired'],
                        },
                        createdAt: { type: 'string', nullable: true },
                        paidAt: { type: 'string', nullable: true },
                        expiresAt: { type: 'string' },
                    },
                },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const userPixChargeQueryingSchema = {
    querystring: {
        type: 'object',
        properties: {
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
            offset: { type: 'integer', minimum: 0, default: 0 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                charges: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            token: { type: 'string', format: 'uuid' },
                            amount: { type: 'number' },
                            description: { type: 'string', nullable: true },
                            status: {
                                type: 'string',
                                enum: ['generated', 'paid', 'expired'],
                            },
                            createdAt: { type: 'string', nullable: true },
                            paidAt: { type: 'string', nullable: true },
                            expiresAt: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
}
