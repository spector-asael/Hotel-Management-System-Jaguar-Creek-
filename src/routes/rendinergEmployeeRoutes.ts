import express from 'express';
import { loadEmployeeBook, loadEmployeeGuest, loadEmployeeHotel, loadEmployeeRoom, loadEmployeeTransaction } from '../controller/renderingEmployeeFiles';

const renderingEmployeeFilesRouter = express.Router();

renderingEmployeeFilesRouter.get('/', (req, res) => {
    res.redirect('/employee/dashboard/book');
});

renderingEmployeeFilesRouter.get('/dashboard/book', loadEmployeeBook);
renderingEmployeeFilesRouter.get('/dashboard/guest', loadEmployeeGuest);
renderingEmployeeFilesRouter.get('/dashboard/hotel', loadEmployeeHotel);
renderingEmployeeFilesRouter.get('/dashboard/room', loadEmployeeRoom);
renderingEmployeeFilesRouter.get('/dashboard/transaction', loadEmployeeTransaction);

export default renderingEmployeeFilesRouter;