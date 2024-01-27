import express, { Request, Response } from 'express';
import { Room } from '../db/model/room';
import { Message } from '../db/model/message';

export const router = express.Router();

router.get('/create', async (req: Request, res: Response) => {

    const roomId = req.cookies.roomId;
    if (!roomId) {
        res.status(400).send('Cookie "roomId" missing');
        return;
    }

    const { name } = req.body;
    if (!name) {
        res.status(400).send('Parameter "name" missing');
        return;
    }
    const room = await Room.create({
        name: name
    });
    console.log(room);
    console.log(room.toJSON());
    res.status(200).send(room);
});

router.get('/messages', async (req: Request, res: Response) => {
    
    const roomId = req.cookies.roomId;
    if (!roomId) {
        res.status(400).send('Cookie "roomId" missing');
        return;
    }

    const messages = await Message.findAll({
        where: {
            roomId: roomId
        }
    });

    res.status(200).send(messages);
});
