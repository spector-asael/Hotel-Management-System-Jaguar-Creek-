import HotelRoom from "../models/hotelroom";

export const loadEmployeeBook = async (req: any, res: any) => {
    let hotelRooms = await HotelRoom.getAllRooms();
    res.render('employee/book/BookHotel', {hotelRooms});
}

export const loadEmployeeGuest = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/guest/guest', {hotelRooms});
}

export const loadEmployeeHotel = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/hotel/hotel', {hotelRooms});
}
export const loadEmployeeRoom = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/room/room',{hotelRooms});
}
export const loadEmployeeTransaction = (req: any, res: any) => {
    let hotelRooms = HotelRoom.getAllRooms();
    res.render('employee/transaction/transaction', {hotelRooms});
}