import { User } from "./usersInterfacesH";
import { HotelRoom } from "./roomInterface";
import { HotelReservation } from "./reservationInterface";

export interface Guest extends User {
  // Properties inherited from User
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  // Methods for Guest
  displayGuest(): void;

  bookReservation(
    startDate: string,
    endDate: string,
    room: HotelRoom,
    reservationMap: Map<number, HotelReservation>
  ): boolean;

  viewReservation(reservation: HotelReservation): void;

  signUp(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    guestMap: Map<number, Guest>
  ): boolean;

  editGuest(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): void;

  // Getter methods for first and last name
  getFirstName(): string;
  getLastName(): string;
}
