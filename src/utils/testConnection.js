// src/testConnection.js

import mysql from "mysql2/promise";

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "your_user",
      password: "your_password",
      database: "your_database",
      port: 3306,
    });
    console.log("Connection successful!");
    await connection.end();
  } catch (error) {
    console.error("Failed to connect:", error.message);
  }
}

testConnection();
