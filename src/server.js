import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { env } from '@root/env'
import jwtAuthenticate from '@root/http/plugins/jwt-authenticate'
import fastify from 'fastify'

/** * Starts the Fastify server.
 * This function initializes the server and listens on the specified port.
 * It handles errors during server startup and logs the server URL.
 * @returns {Promise<void>} A promise that resolves when the server is started.
 */
async function startServer() {
    const server = await buildServer()
    const port = env['PORT']

    try {
        await server.listen({ port })
        console.log(`PIX Payment Server is running on http://localhost:${port}`)
    } catch (error) {
        console.error('Error starting server:', error)
        process.exit(1)
    }
}

// Function to build the Fastify server
/**
 * Builds and configures the Fastify server with necessary plugins and routes.
 * @returns {Promise<FastifyInstance>} A promise that resolves to the Fastify server instance.
 */
async function buildServer() {
    // Create a Fastify server instance
    const server = fastify({ logger: env['NODE_ENV'] === 'development' })

    // CORS configuration
    server.register(fastifyCors, {
        origin: 'http://127.0.0.1:5173',
        credentials: true,
    })
    // Cookie parser
    server.register(fastifyCookie)
    // JWT authentication
    server.register(fastifyJwt, {
        secret: env['JWT_SECRET'],
    })

    // Register plugins
    // Database connection plugin
    // JWT verification plugin
    server.decorate('authenticate', jwtAuthenticate(server))

    // Health check route
    server.get('/', () => {
        return 'ok'
    })

    // Application routes

    return server
}

// Start the application server
startServer()

export { buildServer }
