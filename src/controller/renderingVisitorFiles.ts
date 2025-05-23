import { Request, Response } from 'express';
import path from 'path';
import Reservation from '../models/reservations';
import HotelRoom from '../models/hotelroom';

export const loadLoginForm = (req: Request, res: Response) => {
    res.render('visitor/login/login', { logged: !!req.session.user });
};

export const loadHomePage = (req: Request, res: Response) => {
    res.render('visitor/homepage/homepage', { logged: !!req.session.user });
};

export const loadSignupForm = (req: Request, res: Response) => {
    res.render('visitor/signup/signup', { logged: !!req.session.user });
};

export const loadSignupSuccess = (req: Request, res: Response) => {
    res.render('visitor/success/signup-success', { logged: !!req.session.user });
};

export const loadGuestHomepage = (req: Request, res: Response) => {
    res.render('guest/homepage/homepage', { logged: !!req.session.user });
};

export const loadTeamPage = (req: Request, res: Response) => {
    res.render('visitor/team/team', { logged: !!req.session.user });
};

export const loadContactPage = (req: Request, res: Response) => {
    res.render('visitor/contact/contact', { logged: !!req.session.user });
};

export const loadAboutPage = (req: Request, res: Response) => {
    res.render('visitor/about/about', { logged: !!req.session.user });
};

export const loadVisitorRooms = async (req: Request, res: Response) => {
    const user = req.session.user as { role: number } | undefined;

    if (!user) {
        const id = req.params.id;
        const room = await HotelRoom.getRoomById(Number(id));
        const hotels = await HotelRoom.getAllRooms();

        if (!hotels) {
            res.send("Hotels could not be loaded");
            return;
        }

        if (room == null) {
            res.send("Room not found");
            return;
        }

        const takenDays = await getAllReservedDays(room);
        if (!takenDays) {
            res.send("An error occurred");
            return;
        }

        res.render("guest/rooms/room-visitor", {
            hotels,
            room,
            takenDays,
            logged: false
        });

    } else if (user.role == 0) {
        res.redirect("/guest/rooms/1");
    }
};

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
