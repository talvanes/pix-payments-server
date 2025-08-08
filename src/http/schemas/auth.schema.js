// auth.schema.js

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const userRegistrationSchema = {
    body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            name: { type: 'string', minLength: 1 },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                success: { const: true },
                message: { type: 'string' },
                userId: { type: 'integer' },
                token: { type: 'string', format: 'uuid' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const userLoginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                message: { type: 'string' },
                userId: { type: 'integer' },
                token: { type: 'string', format: 'uuid' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const userLogoutSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                message: { type: 'string' },
            },
        },
    },
}

/**
 * @type {import('fastify').FastifySchema}
 * @const
 */
export const userProfileSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        email: { type: 'string', format: 'email' },
                        name: { type: 'string' },
                        createdAt: { type: 'string' },
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
export const tokenVerificationSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                success: { const: true },
                user: { type: 'object' },
            },
        },
    },
}
