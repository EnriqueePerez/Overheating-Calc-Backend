require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV,
  port: process.env.PORT,
  cors: process.env.CORS,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};

module.exports = { config };
