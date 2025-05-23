import { Response, Request } from 'express'
import HotelRoom from '../models/hotelroom';
import Reservation from '../models/reservations';
import { UserSession } from '../middleware/authMiddleware';
import Guest from '../models/guest';

export const loadAllReservations = async (req: Request, res: Response) => {
    const user_session = req.session.user as UserSession
    const guest_id = user_session.id;

    const hotels = await HotelRoom.getAllRooms();

    if(!hotels){
        res.send("Hotels could not be loaded");
        return;
    }

    const guest = await Guest.findByID(guest_id);
    const reservations = await Reservation.findReservationByUserId(guest_id);

    const guest_username = guest?.getUsername();
    res.render("guest/reservations/reservations", {guest_username, reservations, hotels})
}
export const loadGuestRooms = async (req: Request, res: Response) => {

    const id = req.params.id
    const room = await HotelRoom.getRoomById(Number(id));
    const hotels = await HotelRoom.getAllRooms();

    if(!hotels){
        res.send("Hotels could not be loaded");
        return;
    }

    if(!room){
        res.send("Room not found");
        return   
    } 
    
    const takenDays = await getAllReservedDays(room);
            if(!takenDays){
                res.send("An error occured");
                return;
            }
        res.render("guest/rooms/rooms", {hotels,room, takenDays})
}

const getAllReservedDays = async (hotel: HotelRoom): Promise<Date[]> => {
    const reservations = await Reservation.getAllReservationsForRoom(hotel.getRoomId());
    const reservedDays: Date[] = [];

    for (const res of reservations) {
        const checkIn = normalizeDate(new Date(res.getStartDate()));
        const checkOut = normalizeDate(new Date(res.getEndDate()));

        let current = new Date(checkIn);

        while (current <= checkOut) {
            reservedDays.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
    }

    return reservedDays;
};


const normalizeDate = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};