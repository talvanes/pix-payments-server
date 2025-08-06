import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env.js'

// Function to start the server
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

// Function to build the server
async function buildServer() {
    // Create a Fastify server instance
    const server = fastify({ logger: env.isDevelopment })

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

    // Database connection plugin
    // JWT verification plugin

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
