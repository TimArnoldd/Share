import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

export class Room extends Model {}

Room.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'room'
});
