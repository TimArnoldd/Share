import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'share';
const dbUser = process.env.DB_USER || 'backend';
const dbPassword = process.env.DB_PASSWORD || 'verysecurepassword';
const dbHost = process.env.DB_HOST || 'localhost';

export const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        dialect: 'mysql',
        logging: false,
    }
);
