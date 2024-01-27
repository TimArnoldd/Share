import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'share',
    'share',
    'Aa1.aaaa',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);
