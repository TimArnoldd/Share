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

    static fromJson(json: any): Room {
        const id = json.id;
        const name = json.name;
        let createdAt = json.createdAt;
        if (typeof json.createdAt === 'string') {
            createdAt = new Date(json.createdAt);
        }
        let updatedAt = json.updatedAt;
        if (typeof json.updatedAt === 'string') {
            updatedAt = new Date(json.updatedAt);
        }
        return new Room(id, name, createdAt, updatedAt);
    }
}
