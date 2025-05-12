import { loadLoginForm } from '../controller/renderingFiles.js';
import express from 'express';

const renderingFilesRouter = express();

renderingFilesRouter.get('/login', loadLoginForm);

export default renderingFilesRouter;