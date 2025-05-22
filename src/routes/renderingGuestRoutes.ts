import express from 'express'
import { loadGuestRooms } from '../controller/guestRoutes';

const renderingGuestFilesRouter = express.Router();

renderingGuestFilesRouter.get('/', (req, res)=>{
    res.redirect('/guest/rooms');
})

renderingGuestFilesRouter.get('/rooms', loadGuestRooms);


export default renderingGuestFilesRouter