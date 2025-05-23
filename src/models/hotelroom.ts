import { HotelRoomInterface } from '../interfaces/hotelroomInterface';
import pool from '../db/config';

class HotelRoom extends HotelRoomInterface {
    constructor(
        room_id: number,
        room_name: string,
        room_image_path: string,
        room_description: string,
        room_price_rate: number,
        room_capacity: number
    ) {
        super(
            room_id,
            room_name,
            room_image_path,
            room_description,
            room_price_rate,
            room_capacity
        );
    }

    public getRoomId(): number {
        return this.room_id;
    }

    public getRoomName(): string {
        return this.room_name;
    }

    public getRoomImagePath(): string {
        return this.room_image_path;
    }

    public getRoomDescription(): string {
        return this.room_description;
    }

    public getRoomPriceRate(): number {
        return this.room_price_rate;
    }

    public getRoomCapacity(): number {
        return this.room_capacity;
    }

    public setRoomId(room_id: number): void {
        this.room_id = room_id;
    }

    public setRoomName(room_name: string): void {
        this.room_name = room_name;
    }

    public setRoomImagePath(room_image_path: string): void {
        this.room_image_path = room_image_path;
    }

    public setRoomDescription(room_description: string): void {
        this.room_description = room_description;
    }

    public setRoomPriceRate(room_price_rate: number): void {
        this.room_price_rate = room_price_rate;
    }

    public setRoomCapacity(room_capacity: number): void {
        this.room_capacity = room_capacity;
    }

    public async addRoom(): Promise<void> {
        const query = `
            INSERT INTO hotel_rooms (
                room_name,
                room_image_path,
                room_description,
                room_price_rate,
                room_capacity
            ) VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [
            this.room_name,
            '/' + this.room_image_path,
            this.room_description,
            this.room_price_rate,
            this.room_capacity
        ];

        try {
            await pool.query(query, values);
            console.log('Room added successfully');
        } catch (err) {
            console.error('Error adding room:', err);
            throw err;
        }
    }

    public static async getAllRooms(): Promise<HotelRoom[]> {
        const query = 'SELECT * FROM hotel_rooms';
        try {
            const result = await pool.query(query);
            return result.rows.map((row: any) => new HotelRoom(
                row.room_id,
                row.room_name,
                row.room_image_path,
                row.room_description,
                row.room_price_rate,
                row.room_capacity
            ));
        } catch (err) {
            console.error('Error fetching all rooms:', err);
            throw err;
        }
    }

    public static async getRoomById(room_id: number): Promise<HotelRoom | null> {
        const query = 'SELECT * FROM hotel_rooms WHERE room_id = $1';
        try {
            const result = await pool.query(query, [room_id]);
            if (result.rows.length > 0) {
                const row = result.rows[0];
                return new HotelRoom(
                    row.room_id,
                    row.room_name,
                    row.room_image_path,
                    row.room_description,
                    row.room_price_rate,
                    row.room_capacity
                );
            }
            return null;
        } catch (err) {
            console.error('Error fetching room by ID:', err);
            throw err;
        }
    }
}

export default HotelRoom;
