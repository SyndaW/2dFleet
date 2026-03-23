import dotenv from "dotenv";

dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
}

function number(name, fallback) {
  const val = Number(process.env[name]);
  return Number.isFinite(val) ? val : fallback;
}

export const ENV = {
  HOST: process.env.HOST || "localhost",
  PORT: number("PORT", 3000),
  NODE_ENV: process.env.NODE_ENV || "development",

  SESSION_SECRET:
    process.env.NODE_ENV === "production"
      ? required("SESSION_SECRET")
      : process.env.SESSION_SECRET || "dev-secret",

  ADMIN_PASSWORD:
    process.env.NODE_ENV === "production"
      ? required("ADMIN_PASSWORD")
      : process.env.ADMIN_PASSWORD || "dev-admin",
};

export const isProd = ENV.NODE_ENV === "production";