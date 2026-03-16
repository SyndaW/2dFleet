import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || "dev-secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
