import { MODE, PORT } from '@/env'
import fastify from 'fastify'

/** * Starts the Fastify server.
 * This function initializes the server and listens on the specified port.
 * It handles errors during server startup and logs the server URL.
 * @returns {Promise<void>} A promise that resolves when the server is started.
 */
async function startServer() {
    const server = await buildServer()
    const port = PORT

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
    const server = fastify({ logger: MODE === 'development' })

    // Register plugins

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
