import express from 'express';
import cors from 'cors';
import routes from './../routes/index.js';


const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log('[SERVER] Listening...');
});

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded());
app.use(routes);

app.use((req, res) => {
    res.sendStatus(404);
});

export default app;
