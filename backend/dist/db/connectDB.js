// import pg from 'pg';
// const { Client } = pg;
// const client = new Client({
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
// });
// await client.connect();
// export const query = async (text, params) => await client.query(text, params);
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
//# sourceMappingURL=connectDB.js.map