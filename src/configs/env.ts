// Core
import { z } from 'zod'

const envConfigSchema = z.object({
  VITE_STORE_SECRET_KEY: z.string().min(1)
})

const envConfigParser = envConfigSchema.safeParse({
  VITE_STORE_SECRET_KEY: import.meta.env.VITE_STORE_SECRET_KEY
})

if (!envConfigParser.success) {
  console.error(envConfigParser.error.issues)
  throw new Error('Invalid .env variable values')
}

const envConfig = envConfigParser.data
export default envConfig
