abstract class UserInterface {
    protected user_id: number = 0;
    protected first_name: string = '';
    protected last_name: string = '';
    protected phone_number: string = '';
    protected username: string = '';
    protected password: string = '';
    protected email: string = '';

    public abstract getUserId(): number;
    public abstract getFirstName(): string;
    public abstract getLastName(): string;
    public abstract getPhoneNumber(): string;
    public abstract getUsername(): string;
    public abstract getPassword(): string;
    public abstract getEmail(): string;
    public abstract setUserId(user_id: number): void;
    public abstract setFirstName(first_name: string): void;
    public abstract setLastName(last_name: string): void;
    public abstract setPhoneNumber(phone_number: string): void;
    public abstract setUsername(username: string): void;
    public abstract setPassword(password: string): void;
    public abstract setEmail(email: string): void;

    public abstract validatePassword(username: string, password: string): number;

    constructor(
        user_id: number,
        first_name: string,
        last_name: string,
        phone_number: string,
        username: string,
        password: string,
        email: string
    ) {

        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
export default UserInterface;