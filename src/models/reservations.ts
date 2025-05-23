import pool from '../db/config';
import ReservationInterface from '../interfaces/reservationInterface'
import HotelRoom from './hotelroom';

class Reservation extends ReservationInterface {
    constructor(
        reservation_id: number,
        user_id: number,
        room_id: number,
        start_date: Date,
        end_date: Date
    ) {
        super(reservation_id, user_id, room_id, start_date, end_date);
    }

    public getReservationId(): number {
        return this.reservation_id;
    }

    public getUserId(): number {
        return this.user_id;
    }

    public getRoomId(): number {
        return this.room_id;
    }

    public getStartDate(): Date {
        return this.start_date;
    }

    public getEndDate(): Date {
        return this.end_date;
    }

    public setReservationId(reservation_id: number): void {
        this.reservation_id = reservation_id;
    }

    public setUserId(user_id: number): void {
        this.user_id = user_id;
    }

    public setRoomId(room_id: number): void {
        this.room_id = room_id;
    }

    public setStartDate(start_date: Date): void {
        this.start_date = start_date;
    }

    public setEndDate(end_date: Date): void {
        this.end_date = end_date;
    }

    public async addReservation(): Promise<number> {
       
        const query = `
            INSERT INTO reservations (
                user_id,
                room_id,
                start_date,
                end_date
            ) VALUES ($1, $2, $3, $4)
             RETURNING reservation_id
        `;
        const values = [this.user_id, this.room_id, this.start_date, this.end_date];

        try {
            const result = await pool.query(query, values);
            console.log('Reservation added successfully');
            
            return result.rows[0].reservation_id;
        } catch (err) {
            console.error('Error adding reservation:', err);
            throw err;
        }

        
    }

    
    public static async getAllReservationsForRoom(id: number): Promise<ReservationInterface[]> {
        const query = 'SELECT * FROM reservations WHERE room_id = $1';

        try {   
            const result = await pool.query(query, [id]);
            return result.rows.map(row => new Reservation(
                row.reservation_id,
                row.user_id,
                row.room_id,
                new Date(row.start_date),
                new Date(row.end_date)
            ));
        } catch (err) {
            console.error('Error fetching all reservations:', err);
            throw err;
        }
    }
/*
    public async getReservationsByUserId(user_id: number): Promise<ReservationInterface[]> {
        const query = 'SELECT * FROM reservations WHERE user_id = $1';

        try {
            const result = await pool.query(query, [user_id]);
            return result.rows.map(row => new Reservation(
                row.reservation_id,
                row.user_id,
                row.room_id,
                new Date(row.start_date),
                new Date(row.end_date)
            ));
        } catch (err) {
            console.error('Error fetching reservations by user ID:', err);
            throw err;
        }
    }
    */

    public static async findReservationByUserId(user_id: number) {
        const query = 'SELECT * FROM RESERVATIONS WHERE user_id = $1';
        const values = [user_id];
    
        try {
            const result = await pool.query(query, values); // assuming this.db is your database instance
            return result.rows;
        } catch (error) {
            console.error('Error fetching reservation by user ID:', error);
            throw error;
        }
    }
    
    public async calculateTotalPrice(): Promise<number> {
        if (!this.room_id) {
            throw new Error("Room ID is not set");
        }

        const room = await HotelRoom.getRoomById(this.room_id);

        if (!room) {
            throw new Error("Room not found");
        }

        const priceRate = room.getRoomPriceRate();

        const start = new Date(this.start_date);
        const end = new Date(this.end_date);

        // Normalize time to midnight for accurate day diff
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const timeDiff = end.getTime() - start.getTime();

        if (timeDiff < 0) {
            throw new Error("End date cannot be before start date");
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include same-day stays

        return days * priceRate;
    }
}

export default Reservation;
