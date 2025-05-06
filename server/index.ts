import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT ?? '3000';

app.use(cors());
app.use(express.json());

// DB Setup
// createRelations();
// await sequelize.sync();

// app.use('/api/register-user', registerUserRoute);

app.get("/api", async (req, res) => {
    res.json('Hello World!');
});

app.listen(port, () => {
    console.log(`Backend listening: http://localhost:${port}`);
});
