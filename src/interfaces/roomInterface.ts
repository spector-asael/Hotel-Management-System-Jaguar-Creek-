export interface HotelRoom {
    getRoomID(): number;
    getRoomName(): string;
    getCapacity(): number;
    getPriceRate(): number;
  
    setRoomID(id: number): void;
    setRoomName(name: string): void;
    setCapacity(capacity: number): void;
    setPriceRate(price: number): void;
  
    checkRoomAvailability(): string[][]; // a table-like structure
    displayRoom(): void;
  }
  