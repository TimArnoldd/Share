import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey } from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import { Room } from './room.js';

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare message_id: CreationOptional<number>;
    declare content: string | null;

    declare room_id: ForeignKey<Room['room_id']>;
    declare room: NonAttribute<Room>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Message.init({
    message_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
});
