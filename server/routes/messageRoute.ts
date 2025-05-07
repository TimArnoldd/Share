import { Router } from 'express';
import { Room } from '../models/room.js';

export const messageRoute = Router();

messageRoute.get('/all', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(400).json({ message: 'Cookie "roomId" missing' });
        return;
    }

    const room = await Room.findByPk(token);
    if (!room) {
        res.status(400).json({ message: 'Room not found' });
        return;
    }

    const messages = await room.getMessages();
    res.status(200).json(messages);
});

messageRoute.post('/create', async (req, res) => {
    const token = req.cookies.token;
    const content = req.body.content as string;

    if (!token) {
        res.status(400).json({ message: 'Cookie "roomId" missing' });
        return;
    }
    if (!content) {
        res.status(400).json({ message: 'Parameter "content" missing' });
        return;
    }

    const room = await Room.findByPk(token);
    if (!room) {
        res.status(400).json({ message: 'Room not found' });
        return;
    }

    const message = await room.createMessage({ content: content });

    res.status(201).json(message);
});