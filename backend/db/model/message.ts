import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

export class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'message'
});
