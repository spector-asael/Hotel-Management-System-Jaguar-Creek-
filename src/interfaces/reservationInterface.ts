export default abstract class ReservationInterface {
    protected reservation_id: number = 0;
    protected user_id: number = 0;
    protected room_id: number = 0;
    protected start_date: Date = new Date();
    protected end_date: Date = new Date();

    public abstract getReservationId(): number;
    public abstract getUserId(): number;
    public abstract getRoomId(): number;
    public abstract getStartDate(): Date;
    public abstract getEndDate(): Date;
    public abstract setReservationId(reservation_id: number): void;
    public abstract setUserId(user_id: number): void;
    public abstract setRoomId(room_id: number): void;
    public abstract setStartDate(start_date: Date): void;
    public abstract setEndDate(end_date: Date): void;

    constructor(
        reservation_id: number,
        user_id: number,
        room_id: number,
        start_date: Date,
        end_date: Date
    ) {
        this.reservation_id = reservation_id;
        this.user_id = user_id;
        this.room_id = room_id;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public abstract addReservation(): Promise<number>;
    public abstract calculateTotalPrice(): Promise<number>;
}

