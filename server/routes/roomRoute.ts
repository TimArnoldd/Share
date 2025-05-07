import { Router } from 'express';
import { Room } from '../models/room.js';

export const roomRoute = Router();

roomRoute.get('/', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(400).json({ message: 'Cookie "roomId" missing' });
        return;
    }

    const room = await Room.findByPk(token);
    if (!room) {
        res.status(404).json({ message: 'Room not found' });
        return;
    }

    res.status(200).json(room);
});

roomRoute.post('/create', async (req, res) => {
    const roomName = req.body.roomName as string;

    if (!roomName) {
        res.status(400).json({ message: 'Parameter "roomName" missing' });
        return;
    }

    const room = await Room.create({ name: roomName });

    res.status(201).json(room);
});
