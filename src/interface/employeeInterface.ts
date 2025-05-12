import { User } from "./usersInterfacesH";
import { Guest } from "./guesInterface"; // You’ll define this too
import { HotelRoom } from "./roomInterface"; // Define with room details
import { HotelReservation } from "./reservationInterface"; // Your reservation object

export interface Employee extends User {
  displayEmployee(): void;
  
  bookReservation(
    guest: Guest,
    reservationMap: Map<number, HotelReservation>,
    startDate: string,
    endDate: string,
    room: HotelRoom
  ): boolean;

  cancelReservation(
    reservationMap: Map<number, HotelReservation>,
    reservation: HotelReservation
  ): boolean;

  searchReservation(
    reservationMap: Map<number, HotelReservation>,
    name: string,
    id: number
  ): HotelReservation | undefined;

  processTransaction(
    reservation: HotelReservation,
    amount: number
  ): boolean;
}
