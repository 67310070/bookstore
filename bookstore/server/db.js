require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 4000,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});

module.exports = pool.promise();