import { UserClass } from "./usersC";
import { Employee } from "../interface/employeeInterface";
import { Guest } from "../interface/guesInterface";
import { HotelRoom } from "../interface/roomInterface";
import { HotelReservation } from "../interface/reservationInterface";
import { HotelReservationClass } from "../models/reservationC"; // adjust path if needed

export class EmployeeClass extends UserClass implements Employee {
  constructor(
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    super(id, username, password, firstName, lastName, phoneNumber);
  }

  displayEmployee(): void {
    console.log(`Employee: ${this.firstName} ${this.lastName}`);
    console.log(`Phone: ${this.phoneNumber}`);
    console.log(`Username: ${this.username}`);
  }

  bookReservation(
    guest: Guest,
    reservationMap: Map<number, HotelReservation>,
    startDate: string,
    endDate: string,
    room: HotelRoom
  ): boolean {
    const reservationID = Date.now(); // unique ID
    const newReservation = new HotelReservationClass(
      reservationID,
      guest,
      room,
      new Date(startDate),
      new Date(endDate),
      reservationID
    );
    reservationMap.set(reservationID, newReservation);
    return true;
  }

  cancelReservation(
    reservationMap: Map<number, HotelReservation>,
    reservation: HotelReservation
  ): boolean {
    return reservationMap.delete(reservation.getReservationID());
  }

  searchReservation(
    reservationMap: Map<number, HotelReservation>,
    name: string,
    id: number
  ): HotelReservation | undefined {
    for (const reservation of reservationMap.values()) {
      if (
        reservation.getReservationID() === id &&
        reservation.getGuest().getFirstName() === name
      ) {
        return reservation;
      }
    }
    return undefined;
  }

  processTransaction(reservation: HotelReservation, amount: number): boolean {
    if (amount >= reservation.getHotel().getPriceRate()) {
      // @ts-ignore - if not using setter, you can manually cast
      (reservation as any).isPaid = true;
      return true;
    }
    return false;
  }
}
