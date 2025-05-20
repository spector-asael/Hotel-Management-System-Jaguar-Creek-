export abstract class HotelRoomInterface {
    protected room_id: number;
    protected room_name: string;
    protected room_image_path: string;
    protected room_description: string;
    protected room_price_rate: number;
    protected room_capacity: number;

    constructor(
        room_id: number,
        room_name: string,
        room_image_path: string,
        room_description: string,
        room_price_rate: number,
        room_capacity: number
    ) {
        this.room_id = room_id;
        this.room_name = room_name;
        this.room_image_path = room_image_path;
        this.room_description = room_description;
        this.room_price_rate = room_price_rate;
        this.room_capacity = room_capacity;
    }

    public abstract getRoomId(): number;
    public abstract getRoomName(): string;
    public abstract getRoomImagePath(): string;
    public abstract getRoomDescription(): string;
    public abstract getRoomPriceRate(): number;
    public abstract getRoomCapacity(): number;
    public abstract setRoomId(room_id: number): void;
    public abstract setRoomName(room_name: string): void;
    public abstract setRoomImagePath(room_image_path: string): void;
    public abstract setRoomDescription(room_description: string): void;
    public abstract setRoomPriceRate(room_price_rate: number): void;
    public abstract setRoomCapacity(room_capacity: number): void;

    public abstract addRoom(): Promise<void>;
   
}

/* 
CREATE TABLE hotel_rooms (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(50) NOT NULL,
    room_image_path VARCHAR(1024) NOT NULL,
    room_description TEXT,
    room_price_rate DECIMAL(10, 2) NOT NULL,
    room_capacity INT NOT NULL
);
*/