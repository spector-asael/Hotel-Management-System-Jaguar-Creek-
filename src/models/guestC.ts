import { UserClass } from "./usersC";
import { Guest } from "../interface/guesInterface";
import { HotelRoom } from "../interface/roomInterface";
import { HotelReservation } from "../interface/reservationInterface";
import { HotelReservationClass } from "../models/reservationC"; // make sure the path is correct

class GuestClass implements Guest {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  authenticate(username: string, password: string): number {
    return this.username === username && this.password === password ? 1 : 0;
  }

  sendMessage(
    messageMap: Map<number, string[]>,
    content: string,
    senderID: number,
    receiverID: number
  ): void {
    if (!messageMap.has(receiverID)) {
      messageMap.set(receiverID, []);
    }
    messageMap.get(receiverID)?.push(`From ${senderID}: ${content}`);
  }

  deleteMessage(messageNode: string): boolean {
    // Placeholder logic
    return true;
  }

  displayGuest(): void {
    console.log(`${this.firstName} ${this.lastName}`);
  }

  bookReservation(
    startDate: string,
    endDate: string,
    room: HotelRoom,
    reservationMap: Map<number, HotelReservation>
  ): boolean {
    const reservationID = Date.now(); // unique ID
    const reservation = new HotelReservationClass(
      reservationID,
      this,
      room,
      new Date(startDate),
      new Date(endDate),
      reservationID
    );
    reservationMap.set(reservation.getReservationID(), reservation);
    return true;
  }

  viewReservation(reservation: HotelReservation): void {
    console.log(`Reservation for ${this.firstName}:`);
    console.log(
      `Room: ${reservation.getHotel().getRoomName()}, Dates: ${reservation.getStartDate().toDateString()} to ${reservation.getEndDate().toDateString()}`
    );
  }

  signUp(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    guestMap: Map<number, Guest>
  ): boolean {
    const id = Date.now();
    const newGuest = new GuestClass(id, username, password, firstName, lastName, phoneNumber);
    guestMap.set(id, newGuest);
    return true;
  }

  editGuest(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): void {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  getID(): number {
    return this.id;
  }

  setID(id: number): void {
    this.id = id;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  setPhoneNumber(phone: string): void {
    this.phoneNumber = phone;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
}

export { GuestClass };
