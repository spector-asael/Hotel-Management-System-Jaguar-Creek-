import express from 'express';
import path from 'path';
import renderingFilesRouter from './routes/renderingRoutes';

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(process.cwd(), "./dist/public")));
app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}` );
    next();
});
app.use('/', (renderingFilesRouter));

app.use((req, res) => {
    res.status(404).send("Error");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});