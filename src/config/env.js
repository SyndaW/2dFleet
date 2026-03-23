import dotenv from "dotenv";

dotenv.config();

function required(name, fallback = null) {
  const value = process.env[name] ?? fallback;

  if (value === undefined || value === null) {
    throw new Error(`Missing required env variable: ${name}`);
  }

  return value;
}

export const ENV = {
  HOST: process.env.HOST || "localhost",
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  SESSION_SECRET: required(
    "SESSION_SECRET",
    process.env.NODE_ENV === "production" ? undefined : "dev-secret"
  ),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123",
};

export const isProd = ENV.NODE_ENV === "production";