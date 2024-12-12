import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME || 'share',
    process.env.DATABASE_USER || 'share',
    process.env.DATABASE_PASSWORD || 'Aa1.aaaa',
    {
        host: process.env.DATABASE_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
);
