import { Response, Request } from "express";
import HotelRoom from "../models/hotelroom";
import { Admin } from "../models/admin";
import Employee from "../models/employee";
import Guest from "../models/guest";

export const addHotel = async (req: Request, res: Response) => {
    console.log(req.body);
    const { room_name, room_capacity, price_per_night, room_description } = req.body;
        const imagePath = req.file?.path;

        if (!imagePath) {
            res.status(400).json({ error: 'Image upload failed' });
            return 
        }
       
        const hotelRoom = new HotelRoom(0, room_name, imagePath, room_description, price_per_night, room_capacity);
        await hotelRoom.addRoom();
        
        res.render("admin/success", {message: "Success! Hotel Added!"});
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, phone_number, email, social_security_id, username, password, role } = req.body;

        if (!first_name || !last_name || !phone_number || !email || !social_security_id || !username || !password || role === undefined) {
            res.status(400).json({ error: 'Missing required fields' });
            return 
        }

        const numericRole = Number(role);
        if (isNaN(numericRole)) {
            res.status(400).json({ error: 'Invalid role' });
            return 
        }

        if (numericRole === 0) {
            const guest = new Guest(social_security_id, first_name, last_name, phone_number, username, password, email);
            await guest.createGuest();
        } else if (numericRole === 1) {
            const employee = new Employee(social_security_id, first_name, last_name, phone_number, username, password, email);
            await employee.createEmployee();
        } else if (numericRole === 2) {
            const admin = new Admin(social_security_id, first_name, last_name, phone_number, username, password, email);
            await admin.createAdmin();
        } else {
            res.status(400).json({ error: 'Unknown role type' });
            return 
        }

        res.render( 'admin/success', { message: 'User added successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "User ID is required" });
            return 
        }

         await Admin.deleteUserByID(id);

        res.render("admin/success", {message: "Successfully deleted user."})
    } catch (error) {
        console.error("Error deleting user:", error);
        res.render("admin/success", {message: "Successfully deleted user."})
    }
};
export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
             res.status(400).json({ error: "Hotel ID is required" });
             return
        }

        await Admin.deleteRoomByID(id);

        res.render("admin/success", {message: "Successfully deleted user."})
    } catch (error) {
        console.error("Error deleting hotel:", error);
        res.render("admin/success", {message: "Error."})
    }
};
