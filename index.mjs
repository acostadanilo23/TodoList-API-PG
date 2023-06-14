import express from 'express';
import bodyParser from 'body-parser';

import tasksRoutes from './routes/tasks.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);

app.get('/', (_req, res) =>{
    res.send('Hello World (homepage)');
})


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
