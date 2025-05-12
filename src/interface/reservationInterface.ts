import { Guest } from "./guesInterface"; // assuming it exists
import { HotelRoom } from "./roomInterface";

export interface HotelReservation {
  getGuest(): Guest;
  getHotel(): HotelRoom;
  getStartDate(): Date;
  getEndDate(): Date;
  getReservationID(): number;
  isPaid: boolean;

  setGuest(guest: Guest): void;
  setHotel(hotel: HotelRoom): void;
  setStartDate(start: Date): void;
  setEndDate(end: Date): void;
  setReservationID(id: number): void;

  displayReservation(): void;
}
