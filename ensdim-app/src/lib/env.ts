import { z } from "zod";

export const envSchema = z.object({
  // Supabase (required)
  NEXT_PUBLIC_SUPABASE_URL:      z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // App
  NEXT_PUBLIC_APP_NAME: z.string().default("Ensdim"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    throw new Error(
      "❌ Invalid environment variables:\n" +
      JSON.stringify(parsed.error.format(), null, 2),
    );
  }
  return parsed.data;
}
