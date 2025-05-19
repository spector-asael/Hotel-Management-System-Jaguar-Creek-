"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomClass = void 0;
class HotelRoomClass {
    constructor(roomID, roomName, capacity, priceRate) {
        this.roomID = roomID;
        this.roomName = roomName;
        this.capacity = capacity;
        this.priceRate = priceRate;
    }
    getRoomID() {
        return this.roomID;
    }
    getRoomName() {
        return this.roomName;
    }
    getCapacity() {
        return this.capacity;
    }
    getPriceRate() {
        return this.priceRate;
    }
    setRoomID(id) {
        this.roomID = id;
    }
    setRoomName(name) {
        this.roomName = name;
    }
    setCapacity(capacity) {
        this.capacity = capacity;
    }
    setPriceRate(price) {
        this.priceRate = price;
    }
    checkRoomAvailability() {
        // For now, just a mock table showing dates and availability
        return [
            ["Date", "Available"],
            ["2025-05-12", "Yes"],
            ["2025-05-13", "No"],
            ["2025-05-14", "Yes"]
        ];
    }
    displayRoom() {
        console.log(`Room ID: ${this.roomID}`);
        console.log(`Room Name: ${this.roomName}`);
        console.log(`Capacity: ${this.capacity}`);
        console.log(`Price Rate: $${this.priceRate.toFixed(2)}`);
    }
}
exports.HotelRoomClass = HotelRoomClass;
