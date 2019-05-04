import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASS,
    database: process.env.DATABASE,
    port: process.env.PORT
});

connection.connect();

export default connection;
