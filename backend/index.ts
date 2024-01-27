import express, { Request, Response } from 'express';
import { sequelize } from './db/db';
import { createRelations } from './db/dbSetup';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hoi');
});


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
