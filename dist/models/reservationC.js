"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelReservationClass = void 0;
class HotelReservationClass {
    constructor(id, guest, hotel, startDate, endDate, reservationID) {
        this.id = id;
        this.guest = guest;
        this.hotel = hotel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reservationID = reservationID;
        this.isPaid = false;
    }
    getGuest() {
        return this.guest;
    }
    getHotel() {
        return this.hotel;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getReservationID() {
        return this.reservationID;
    }
    setGuest(guest) {
        this.guest = guest;
    }
    setHotel(hotel) {
        this.hotel = hotel;
    }
    setStartDate(start) {
        this.startDate = start;
    }
    setEndDate(end) {
        this.endDate = end;
    }
    setReservationID(id) {
        this.reservationID = id;
    }
    displayReservation() {
        console.log("Reservation Details:");
        console.log(`Reservation ID: ${this.reservationID}`);
        console.log(`Guest: ${this.guest.getFirstName()} ${this.guest.getLastName()}`);
        console.log(`Hotel Room: ${this.hotel.getRoomName()} (ID: ${this.hotel.getRoomID()})`);
        console.log(`Start Date: ${this.startDate.toDateString()}`);
        console.log(`End Date: ${this.endDate.toDateString()}`);
    }
}
exports.HotelReservationClass = HotelReservationClass;
