import dotenv from "dotenv";

dotenv.config();

/**
 * Normalize string (trim + ensure string)
 */
function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Get required env variable
 */
function required(name) {
  const value = str(process.env[name]);

  if (!value) {
    throw new Error(`❌ Missing required env variable: ${name}`);
  }

  return value;
}

/**
 * Get optional env variable
 */
function optional(name, fallback) {
  const raw = process.env[name];

  if (raw === undefined) return fallback;

  const value = str(raw);
  return value || fallback;
}

/**
 * Parse number safely
 */
function number(name, fallback) {
  const raw = process.env[name];

  if (raw === undefined) return fallback;

  const value = Number(str(raw));

  if (!Number.isFinite(value)) {
    throw new Error(`❌ Invalid number for ${name}: "${raw}"`);
  }

  return value;
}

/**
 * Validate port range
 */
function validatePort(port) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`❌ Invalid PORT: ${port}`);
  }
  return port;
}

/**
 * Validate strong secret (basic safety)
 */
function validateSecret(name, value, isProd) {
  if (!value) {
    throw new Error(`❌ ${name} cannot be empty`);
  }

  if (isProd && value.length < 16) {
    throw new Error(
      `❌ ${name} must be at least 16 characters in production`
    );
  }

  return value;
}

/**
 * Normalize NODE_ENV
 */
function normalizeEnv(env) {
  const value = str(env).toLowerCase();

  if (!value) return "development";

  if (!["development", "production", "test"].includes(value)) {
    throw new Error(`❌ Invalid NODE_ENV: "${env}"`);
  }

  return value;
}

/* ========================= */

const NODE_ENV = normalizeEnv(process.env.NODE_ENV);
const isProd = NODE_ENV === "production";

const PORT = validatePort(number("PORT", 3000));

const SESSION_SECRET = validateSecret(
  "SESSION_SECRET",
  isProd ? required("SESSION_SECRET") : optional("SESSION_SECRET", "dev-secret"),
  isProd
);

const ADMIN_PASSWORD = validateSecret(
  "ADMIN_PASSWORD",
  isProd ? required("ADMIN_PASSWORD") : optional("ADMIN_PASSWORD", "dev-admin"),
  isProd
);

/* ========================= */

export const ENV = {
  HOST: optional("HOST", "localhost"),
  PORT,
  NODE_ENV,

  SESSION_SECRET,
  ADMIN_PASSWORD,
};

export { isProd };