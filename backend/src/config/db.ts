// Get the client
import mysql from "mysql2/promise";

// Create the connection to database

const getConnection = async () => {
  const connection = await mysql.createConnection({
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return connection;
};

export default getConnection;
