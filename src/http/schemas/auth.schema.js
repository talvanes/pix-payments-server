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
                success: { type: 'boolean' },
                message: { type: 'string' },
                userId: { type: 'integer' },
                token: { type: 'string' },
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
            password: { type: 'string', minLength: 1 },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                userId: { type: 'integer' },
                token: { type: 'string' },
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
                success: { type: 'boolean' },
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
                success: { type: 'boolean' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        email: { type: 'string' },
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
                success: { type: 'boolean' },
                user: { type: 'object' },
            },
        },
    },
}
