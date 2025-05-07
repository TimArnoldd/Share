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

    static fromObject(object: any): Message {
        const id = object.id;
        const content = object.content;
        let createdAt = object.createdAt;
        if (typeof object.createdAt === 'string') {
            createdAt = new Date(object.createdAt);
        }
        let updatedAt = object.updatedAt;
        if (typeof object.updatedAt === 'string') {
            updatedAt = new Date(object.updatedAt);
        }
        return new Message(id, content, createdAt, updatedAt);
    }
}
