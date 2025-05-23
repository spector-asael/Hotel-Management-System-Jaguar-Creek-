import express from 'express'
import { loadAllReservations, loadGuestRooms } from '../controller/guestRoutesController';

const renderingGuestFilesRouter = express.Router();

renderingGuestFilesRouter.get('/', (req, res)=>{
    res.redirect('/guest/rooms/1');
})

renderingGuestFilesRouter.get('/rooms/:id', loadGuestRooms);

renderingGuestFilesRouter.get('/reservations', loadAllReservations);


export default renderingGuestFilesRouter