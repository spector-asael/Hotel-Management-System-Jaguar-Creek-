import { HotelReservation } from "../interface/reservationInterface";
import { Guest } from "../interface/guesInterface";
import { HotelRoom } from "../interface/roomInterface";

export class HotelReservationClass implements HotelReservation {
  private id: number;
  private guest: Guest;
  private hotel: HotelRoom;
  private startDate: Date;
  private endDate: Date;
  private reservationID: number;
  isPaid: boolean;

  constructor(
    id: number,
    guest: Guest,
    hotel: HotelRoom,
    startDate: Date,
    endDate: Date,
    reservationID: number
  ) {
    this.id = id;
    this.guest = guest;
    this.hotel = hotel;
    this.startDate = startDate;
    this.endDate = endDate;
    this.reservationID = reservationID;
    this.isPaid = false; 
  }

  getGuest(): Guest {
    return this.guest;
  }

  getHotel(): HotelRoom {
    return this.hotel;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getReservationID(): number {
    return this.reservationID;
  }

  setGuest(guest: Guest): void {
    this.guest = guest;
  }

  setHotel(hotel: HotelRoom): void {
    this.hotel = hotel;
  }

  setStartDate(start: Date): void {
    this.startDate = start;
  }

  setEndDate(end: Date): void {
    this.endDate = end;
  }

  setReservationID(id: number): void {
    this.reservationID = id;
  }
  

  displayReservation(): void {
    console.log("Reservation Details:");
    console.log(`Reservation ID: ${this.reservationID}`);
    console.log(`Guest: ${this.guest.getFirstName()} ${this.guest.getLastName()}`);
    console.log(`Hotel Room: ${this.hotel.getRoomName()} (ID: ${this.hotel.getRoomID()})`);
    console.log(`Start Date: ${this.startDate.toDateString()}`);
    console.log(`End Date: ${this.endDate.toDateString()}`);
  }
}
