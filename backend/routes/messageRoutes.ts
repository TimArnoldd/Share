import express, { Request, Response } from 'express';
import { Message } from '../db/model/message';

export const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {

    const roomId = req.cookies.roomId;
    if (!roomId) {
        res.status(400).send('Cookie "roomId" missing');
        return;
    }

    const { content } = req.body;
    if (!content) {
        res.status(400).send('Parameter "content" missing');
        return;
    }

    const message = await Message.create({
        content: content,
        roomId: roomId
    });

    res.status(200).send(message);
});
