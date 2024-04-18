import { z } from "zod";

const envSchema = z.object({
  TOMTOM_API_KEY: z.string(),
});

let cache: z.infer<typeof envSchema>;

export const getEnv = () => {
  if (cache) return cache;
  cache = envSchema.parse(process.env);
  return cache;
};
