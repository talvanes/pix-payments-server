import { env } from './env.js'
import { buildServer } from './server.js'

const port = env['PORT']

async function startServer() {
    try {
        const server = await buildServer()
        await server.listen({ port })
        console.log(`PIX Payment Server is running on http://localhost:${port}`)
    } catch (error) {
        console.error('Error starting server:', error)
        process.exit(1)
    }
}

startServer()
