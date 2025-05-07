import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import { Message } from './messages.js';

export class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
    declare room_id: CreationOptional<number>;
    declare name: string;

    declare getMessages: HasManyGetAssociationsMixin<Message>;
    declare addMessage: HasManyAddAssociationMixin<Message, number>;
    declare addMessages: HasManyAddAssociationsMixin<Message, number>;
    declare setMessages: HasManySetAssociationsMixin<Message, number>;
    declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
    declare removeMessages: HasManyRemoveAssociationsMixin<Message, number>;
    declare hasMessage: HasManyHasAssociationMixin<Message, number>;
    declare hasMessages: HasManyHasAssociationsMixin<Message, number>;
    declare countMessages: HasManyCountAssociationsMixin;
    declare createMessage: HasManyCreateAssociationMixin<Message, 'room_id'>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Room.init({
    room_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
});
