import HotelRoom from "../models/hotelroom";
import { Admin} from "../models/admin";

export const loadAdminUsers = async (req: any, res: any) => {
    let users = await Admin.getAllUsers();
    res.render('admin/admin-page/employee', {users});
}

export const loadHotels = async (req: any, res: any) => {
    let hotels = await HotelRoom.getAllRooms();
    res.render('admin/admin-page/admin-hotel', {hotels});
}

export const loadAdminEmployeeForm = (req: any, res: any) => {
    res.render('admin/admin-page/add-employee');
}

export const loadAdminHotelForm = (req: any, res: any) => {
    res.render('admin/admin-page/add-hotel');
}

