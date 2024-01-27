import { Room } from "./model/room";
import { Message } from "./model/message";

export const createRelations = () => {
    Room.hasMany(Message);
    Message.belongsTo(Room);
}
