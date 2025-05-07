import express, { Request, Response } from 'express';
import { sequelize } from './db/db';
import { createRelations } from './db/dbSetup';
import { router as roomRouter } from './routes/roomRoutes';
import { router as messageRouter } from './routes/messageRoutes';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Origin', `${process.env.WEB_FRONTEND_URL || 'http://localhost'}:${process.env.WEB_FRONTEND_PORT || 8000}`);
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.route('/').get((req: Request, res: Response) => {
    res.send('Hello World!');
});
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);

app.use((req: Request, res: Response) => {
    res.status(404).send('404 Not Found');
});

(async () => {

    createRelations();
    await sequelize.sync();

    app.listen(port, () => {
        console.log(`Backend listening at http://localhost:${port}`);
    });
})();
