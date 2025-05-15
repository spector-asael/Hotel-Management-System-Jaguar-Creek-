import { User } from "./usersInterfacesH";
import { Guest } from "./guesInterface"; // You’ll define this too
import { HotelRoom } from "./roomInterface"; // Define with room details
import { HotelReservation } from "./reservationInterface"; // Your reservation object

export interface Employee extends User {
  displayEmployee(): void;

  bookReservation(
    guest: Guest,
    startDate: string,
    endDate: string,
    room: HotelRoom
  ): Promise<boolean>;

  cancelReservation(reservationID: number): Promise<boolean>;

  searchReservation(name: string, id: number): Promise<HotelReservation | null>;

  processTransaction(reservationID: number, amount: number): Promise<boolean>;
}

