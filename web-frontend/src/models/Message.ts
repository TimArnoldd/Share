export class Message {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, content: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): Message {
        const id = json.id;
        const content = json.content;
        let createdAt = json.createdAt;
        if (typeof json.createdAt === 'string') {
            createdAt = new Date(json.createdAt);
        }
        let updatedAt = json.updatedAt;
        if (typeof json.updatedAt === 'string') {
            updatedAt = new Date(json.updatedAt);
        }
        return new Message(id, content, createdAt, updatedAt);
    }
}
