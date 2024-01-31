import express, { Request, Response } from 'express';
import { sequelize } from './db/db';
import { createRelations } from './db/dbSetup';
import { router as roomRouter } from './routes/roomRoutes';
import { router as messageRouter } from './routes/messageRoutes';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Konis Hupen!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/room', roomRouter);
app.use('/message', messageRouter);

app.use(function (req: Request, res: Response) {
    res.status(404).send('404 Not Found');
});

(async () => {

    createRelations();
    await sequelize.sync();

    app.listen(port, () => {
        console.log(`Backend listening at http://localhost:${port}`);
    });
})();
