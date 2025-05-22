import express from 'express';
import path from 'path';
import renderingVisitorFilesRouter from './routes/renderingVisitorRoutes';
import renderingEmployeeFilesRouter from './routes/rendinergEmployeeRoutes';
import renderingAdminFilesRouter from './routes/adminRoutes';
import renderingGuestFilesRouter from './routes/renderingGuestRoutes';
import apiRouter from './routes/apiRoutes';
import session from 'express-session';
import { authGuard } from './middleware/authMiddleware';

const app = express();

app.set('view engine', 'ejs'); // tells Express to use EJS
console.log("DIRNAME:", __dirname);
app.set('views', path.join(process.cwd(), './dist/views')); // set the views directory to the dist folder
console.log('Express views directory after set:', app.get('views'));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(process.cwd(), "./dist/public")));
app.use(express.json());


app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}` );
    next();
});
app.use(session({
    secret: 'keyboard cat',          // used to sign the session ID cookie
    resave: false,                   // don't save session if unmodified
    saveUninitialized: false,        // don't create session until something is stored
    cookie: { secure: false }       
}));

app.use(authGuard);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.get('/', (req, res) => {
    res.redirect('/visitor/homepage');
});

app.use('/admin', (renderingAdminFilesRouter));
app.use('/employee', (renderingEmployeeFilesRouter));
app.use('/visitor', (renderingVisitorFilesRouter));
app.use('/guest', renderingGuestFilesRouter);
app.use('/api/', (apiRouter));

app.use((req, res) => {
    res.status(404).send("Error");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});