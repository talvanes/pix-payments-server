import { config } from 'dotenv'

// Load environment variables from .env file
config()

// Export environment variables for use in the application
/** @var {"development" | "staging" | "production"} */
export const MODE = process.env.MODE || 'development'

/** @var {number} */
export const PORT = Number(process.env.PORT) || 3000

/** @var {string} */
export const JWT_SECRET = process.env.JWT_SECRET
