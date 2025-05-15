// guestInterface.ts

import { User } from './usersInterfacesH'; // Assuming userInterface.ts contains the User interface

export interface Guest extends User {
    displayGuest(): void;

    bookReservation(
        startDate: string,
        endDate: string,
        hotelRoom: any,
        reservationDetails: any
    ): Promise<boolean>;

    viewReservation(reservation: any): Promise<void>;

    signUp(
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string
    ): Promise<boolean>;

    editGuest(
        username: string,
        firstName: string,
        lastName: string,
        password: string,
        phoneNumber: string
    ): Promise<boolean>;
}
