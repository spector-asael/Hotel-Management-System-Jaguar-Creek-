import { Response, Request } from 'express'
import HotelRoom from '../models/hotelroom';

export const loadGuestRooms = (req: Request, res: Response) => {

    const hotels = HotelRoom.getAllRooms();

    res.render("guest/rooms/rooms", {hotels});
    
}