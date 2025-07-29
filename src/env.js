import { config } from 'dotenv'
import { cleanEnv, port, str } from 'envalid'

// Load environment variables from .env file
config()

// Valdiate environment variables
export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port(),
    JWT_SECRET: str(),
    SQLITE_DB_PATH: str({ default: './data/pix-payments.db' }),
})
