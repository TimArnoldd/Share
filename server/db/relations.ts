import { Message } from '../models/messages.js';
import { Room } from '../models/room.js';

export function createRelations() {

    Room.hasMany(Message, {
        onDelete: 'CASCADE',
        foreignKey: 'room_id',
    });
    Message.belongsTo(Room, {
        foreignKey: 'room_id',
    });
}