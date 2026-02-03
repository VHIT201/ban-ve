import { z } from "zod";

const envConfigSchema = z.object({
  NEXT_PUBLIC_STORE_SECRET_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_STORE_SECRET_KEY is required")
    .default("123"),
});

const envConfigParser = envConfigSchema.safeParse({
  NEXT_PUBLIC_STORE_SECRET_KEY: process.env.NEXT_PUBLIC_STORE_SECRET_KEY,
});

if (!envConfigParser.success) {
  console.error("❌ Invalid environment variables:");
  console.error(envConfigParser.error.flatten().fieldErrors);
  throw new Error("Invalid .env variable values");
}

const envConfig = envConfigParser.data;

export default envConfig;
