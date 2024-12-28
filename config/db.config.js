const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

const environment = process.env.NODE_ENV || "prod";

if (environment === "dev") {
  dotenv.config({ path: `.env.${environment}` });
} else {
  dotenv.config({ path: `.env` });
}


/************ Sequelize configuration ********/
console.log(process.env.DB_NAME)
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (error) {
    console.error("Database connection failed!:", error);
  }
}

module.exports = { sequelize, testDBConnection };
