// File: src/routes/renderingRoutes
import { loadHomePage, loadLoginForm, loadSignupForm, loadSignupSuccess } from '../controller/renderingVisitorFiles.js';
import express from 'express';

const renderingVisitorFilesRouter = express.Router();

renderingVisitorFilesRouter.get('/', (req, res) => {
    res.redirect('/visitor/homepage');
});

renderingVisitorFilesRouter.get('/login', loadLoginForm);

renderingVisitorFilesRouter.get('/homepage', loadHomePage);

renderingVisitorFilesRouter.get('/signup', loadSignupForm);

renderingVisitorFilesRouter.get('/signup-success', loadSignupSuccess);

export default renderingVisitorFilesRouter;