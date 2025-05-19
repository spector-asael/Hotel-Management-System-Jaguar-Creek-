import { loadHomePage, loadLoginForm, loadSignupForm } from '../controller/renderingVisitorFiles.js';
import express from 'express';

const renderingVisitorFilesRouter = express.Router();

renderingVisitorFilesRouter.get('/login', loadLoginForm);

renderingVisitorFilesRouter.get('/homepage', loadHomePage);

renderingVisitorFilesRouter.get('/signup', loadSignupForm);

export default renderingVisitorFilesRouter;