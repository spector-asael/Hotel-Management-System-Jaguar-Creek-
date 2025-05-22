import express from 'express';
import { loadEmployeeBook, loadEmployeeBooking, loadEmployeeGuest, loadEmployeeHotel, loadEmployeeRoom, loadEmployeeTransaction, loadUserReservation, searchGuestById, searchGuestByUsername } from '../controller/renderingEmployeeFiles';

const renderingEmployeeFilesRouter = express.Router();

renderingEmployeeFilesRouter.get('/', (req, res) => {
    res.redirect('/employee/dashboard/book');
});

renderingEmployeeFilesRouter.get('/dashboard/book', loadEmployeeBook);
renderingEmployeeFilesRouter.get('/dashboard/booking', loadEmployeeBooking)
renderingEmployeeFilesRouter.get('/dashboard/guest', loadEmployeeGuest);
renderingEmployeeFilesRouter.get('/dashboard/hotel', loadEmployeeHotel);
renderingEmployeeFilesRouter.get('/dashboard/room', loadEmployeeRoom);
renderingEmployeeFilesRouter.get('/dashboard/transaction', loadEmployeeTransaction);
renderingEmployeeFilesRouter.post('/guest/id', searchGuestById);
renderingEmployeeFilesRouter.post('/guest/username', searchGuestByUsername);
renderingEmployeeFilesRouter.post('/guest/reservations/:id', loadUserReservation);

export default renderingEmployeeFilesRouter;
