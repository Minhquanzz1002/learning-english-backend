import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;

const MONGODB_USERNAME = process.env.MONGODB_USERNAME || "";
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
const MONGODB_URL = process.env.MONGODB_URL || "";

export const config = {
  mongodb: {
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT
  }
};