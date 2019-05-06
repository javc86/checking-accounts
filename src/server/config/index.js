import dotenv from 'dotenv';

dotenv.config();

export const config = {
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASS,
    database: process.env.DATABASE,
    port: process.env.PORT
};
