export class Room {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject(object: any): Room {
        const id = object.id;
        const name = object.name;
        let createdAt = object.createdAt;
        if (typeof object.createdAt === 'string') {
            createdAt = new Date(object.createdAt);
        }
        let updatedAt = object.updatedAt;
        if (typeof object.updatedAt === 'string') {
            updatedAt = new Date(object.updatedAt);
        }
        return new Room(id, name, createdAt, updatedAt);
    }
}
