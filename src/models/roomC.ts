import { HotelRoom } from "../interfaces/roomInterface";

export class HotelRoomClass implements HotelRoom {
  private roomID: number;
  private roomName: string;
  private capacity: number;
  private priceRate: number;

  constructor(roomID: number, roomName: string, capacity: number, priceRate: number) {
    this.roomID = roomID;
    this.roomName = roomName;
    this.capacity = capacity;
    this.priceRate = priceRate;
  }

  getRoomID(): number {
    return this.roomID;
  }

  getRoomName(): string {
    return this.roomName;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getPriceRate(): number {
    return this.priceRate;
  }

  setRoomID(id: number): void {
    this.roomID = id;
  }

  setRoomName(name: string): void {
    this.roomName = name;
  }

  setCapacity(capacity: number): void {
    this.capacity = capacity;
  }

  setPriceRate(price: number): void {
    this.priceRate = price;
  }

  checkRoomAvailability(): string[][] {
    // For now, just a mock table showing dates and availability
    return [
      ["Date", "Available"],
      ["2025-05-12", "Yes"],
      ["2025-05-13", "No"],
      ["2025-05-14", "Yes"]
    ];
  }

  displayRoom(): void {
    console.log(`Room ID: ${this.roomID}`);
    console.log(`Room Name: ${this.roomName}`);
    console.log(`Capacity: ${this.capacity}`);
    console.log(`Price Rate: $${this.priceRate.toFixed(2)}`);
  }
}
