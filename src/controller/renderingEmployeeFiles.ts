import HotelRoom from "../models/hotelroom";
import Guest from "../models/guest";
import { Request, Response } from "express";
import Reservation from "../models/reservations";

export const loadEmployeeBook = async (req: any, res: any) => {
    let hotelRooms = await HotelRoom.getAllRooms();
    res.render('employee/book/BookHotel', {hotelRooms});
}

export const loadEmployeeBooking = async (req: any, res: any) => {
    let hotelRooms = await HotelRoom.getAllRooms();
    res.render('employee/book/BookingHotel', {hotelRooms});
}

export const loadEmployeeGuest = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/guest/guest', {hotelRooms});
}

export const loadEmployeeHotel = async (req: any, res: any) => {
    let hotels = await HotelRoom.getAllRooms();
    res.render('employee/hotel/hotel', {hotels});
}
export const loadEmployeeRoom = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/room/room',{hotelRooms});
}
export const loadEmployeeTransaction = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/transaction/transaction', {hotelRooms});
}

export async function searchGuestByUsername(req: Request, res: Response) {
    const { username } = req.body;
    
    const user = await Guest.findByUsername(username);
   
    if(!user) {
        res.status(404).send("User not found");
        return;
    }

    res.render('employee/guest/guestfound', { user });
}
  
  export async function searchGuestById(req: any, res: any) {
    const { id } = req.body;
   
    const user = await Guest.findByID(id);
   
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
  
    res.render('employee/guest/guestfound', { user });
  }
  
  export async function loadUserReservation(req: any, res: any) {
    const { id } = req.body;

    try {
    const user = await Guest.findByID(id);
    
    const reservations = await Reservation.findReservationByUserId(id);
    if(!reservations) {
        throw new Error("No reservations found for this user");
    }
    } catch (error) {
        res.status(404).send(error);
        return;
    }
  }