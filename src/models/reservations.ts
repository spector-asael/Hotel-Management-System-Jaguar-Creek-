import pool from '../db/config';
import ReservationInterface from '../interfaces/reservationInterface'

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

    public async addReservation(): Promise<void> {
        console.log("hi");
        const query = `
            INSERT INTO reservations (
                user_id,
                room_id,
                start_date,
                end_date
            ) VALUES ($1, $2, $3, $4)
        `;
        const values = [this.user_id, this.room_id, this.start_date, this.end_date];

        try {
            await pool.query(query, values);
            console.log('Reservation added successfully');
        } catch (err) {
            console.error('Error adding reservation:', err);
            throw err;
        }
    }

    public async getAllReservations(): Promise<ReservationInterface[]> {
        const query = 'SELECT * FROM reservations';

        try {
            const result = await pool.query(query);
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

    public async findReservationByUserId(user_id: number) {
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
    
}

export default Reservation;
