import express from 'express';
import cors from 'cors';
import { createRelations } from './db/relations.js';
import { sequelize } from './db/sequelize.js';
import cookieParser from 'cookie-parser';
import { messageRoute } from './routes/messageRoute.js';
import { roomRoute } from './routes/roomRoute.js';

const app = express();
const port = process.env.PORT ?? '3000';

const corsOptions: cors.CorsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// DB Setup
createRelations();
await sequelize.sync();

app.use('/api/message', messageRoute);
app.use('/api/room', roomRoute);

app.get("/api", async (req, res) => {
    res.json('Hello World!');
});

app.listen(port, () => {
    console.log(`Backend listening: http://localhost:${port}`);
});
