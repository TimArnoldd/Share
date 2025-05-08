export class Message {
    message_id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(message_id: string, content: string, createdAt: Date | string, updatedAt: Date | string) {
        this.message_id = message_id;
        this.content = content;

        if (typeof createdAt === 'string') {
            this.createdAt = new Date(createdAt);
        }
        else {
            this.createdAt = createdAt;
        }

        if (typeof updatedAt === 'string') {
            this.updatedAt = new Date(updatedAt);
        }
        else {
            this.updatedAt = updatedAt;
        }
    }
}