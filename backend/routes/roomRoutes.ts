import express, { Request, Response } from 'express';
import { Room } from '../db/model/room';
import { Message } from '../db/model/message';

export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    
    const roomId = req.cookies.roomId;
    if (!roomId) {
        res.status(400).send('Cookie "roomId" missing');
        return;
    }

    const room = await Room.findOne({
        where: {
            id: roomId
        }
    });

    res.status(200).send(room);
});

router.post('/create', async (req: Request, res: Response) => {

    const { name } = req.body;
    if (!name) {
        res.status(400).send('Parameter "name" missing');
        return;
    }

    const room = await Room.create({
        name: name
    });
    
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
