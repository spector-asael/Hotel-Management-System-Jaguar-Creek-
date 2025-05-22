// File: src/routes/renderingRoutes
import { loadAboutPage, loadContactPage, loadHomePage, loadLoginForm, loadSignupForm, loadSignupSuccess, loadTeamPage, loadVisitorRooms } from '../controller/renderingVisitorFiles.js';
import express from 'express';

const renderingVisitorFilesRouter = express.Router();

renderingVisitorFilesRouter.get('/', (req, res) => {
    res.redirect('/visitor/homepage');
});

renderingVisitorFilesRouter.get('/login', loadLoginForm);

renderingVisitorFilesRouter.get('/homepage', loadHomePage);

renderingVisitorFilesRouter.get('/signup', loadSignupForm);

renderingVisitorFilesRouter.get('/signup-success', loadSignupSuccess);

renderingVisitorFilesRouter.get('/team', loadTeamPage);

renderingVisitorFilesRouter.get('/contact', loadContactPage);

renderingVisitorFilesRouter.get('/about', loadAboutPage);

renderingVisitorFilesRouter.get('/rooms', loadVisitorRooms);

export default renderingVisitorFilesRouter;