import { Request, Response } from 'express';
import Guest from '../models/guest'; // Adjust import path as needed
import User from '../models/user'; // Adjust import path as needed
import Reservation from '../models/reservations'; // Adjust import path as needed

export const bookHotelNew = async (req: Request, res: Response) => {
    try {
        const {
            "first-name": firstName,
            "last-name": lastName,
            "phone-number": phoneNumber,
            email,
            "social-security-id": socialSecurityId,
            username,
            password,
            "check-in": checkIn,
            "check-out": checkOut,
            hotel, // room_id
        } = req.body;

        // Validate date input
        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
            return res.render('employee/book/success', {
                message: "Invalid check-in/check-out dates."
            });
        }

        // Check if guest already exists
        const existingGuest = await Guest.findByUsername(username); // You’re implementing this
        if (existingGuest) {
            return res.render('employee/book/success', {
                message: "An account with this username already exists. Please log in instead."
            });
        }

        // Create new guest and reservation
        const guest = new Guest(
            socialSecurityId,
            firstName,
            lastName,
            phoneNumber,
            username,
            password,
            email
        );

        await guest.createGuest();

        const reservation = new Reservation(
            0, // reservation_id will be auto-generated
            socialSecurityId,
            hotel,
            start,
            end
        );

        await reservation.addReservation();

        res.render('employee/book/success', {
            message: "Booking successful"
        });

    } catch (err) {
        console.error("Booking error:", err);
        res.render('employee/book/success', {
            message: "Server error while booking"
        });
    }
};
