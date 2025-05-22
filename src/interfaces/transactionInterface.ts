export abstract class TransactionInterface {

    protected transaction_id: number = 0;
    protected reservation_id: number = 0;
    protected transaction_date: Date = new Date();
    protected transaction_amount: number = 0;
    protected transaction_status: number = 0; 

    public abstract getTransactionId(): number;
    public abstract getReservationId(): number;
    public abstract getTransactionDate(): Date;
    public abstract getTransactionAmount(): number;
    public abstract getTransactionStatus(): number;
    public abstract setTransactionId(transaction_id: number): void;
    public abstract setReservationId(reservation_id: number): void;
    public abstract setTransactionDate(transaction_date: Date): void;
    public abstract setTransactionAmount(transaction_amount: number): void;

    public abstract updateTransactionStatus(reservation_id: number, transaction_status: number): Promise<void>;
    public abstract setTransactionStatus(transaction_status: number): void;
    public abstract addTransactionToDB(): Promise<void>;
    

    constructor(transaction_id: number, reservation_id: number, transaction_date: Date, transaction_amount: number, transaction_status: number) {
        this.transaction_id = transaction_id;
        this.reservation_id = reservation_id;
        this.transaction_date = transaction_date;
        this.transaction_amount = transaction_amount;
        this.transaction_status = transaction_status;
    }
   
    
}