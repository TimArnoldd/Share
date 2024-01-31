export class Room {
    id?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor() { }

    static fromJson(json: any): Room {
        const room = new Room();
        room.id = json.id;
        room.name = json.name;
        room.createdAt = json.createdAt;
        if (typeof json.createdAt === 'string') {
            room.createdAt = new Date(json.createdAt);
        }
        room.updatedAt = json.updatedAt;
        if (typeof json.updatedAt === 'string') {
            room.updatedAt = new Date(json.updatedAt);
        }
        return room;
    }
}
