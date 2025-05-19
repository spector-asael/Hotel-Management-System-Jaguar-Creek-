import User from '../models/user';

abstract class AdminInterface extends User {
    constructor(
        user_id: number,
        first_name: string,
        last_name: string,
        phone_number: string,
        username: string,
        password: string,
        email: string
    ) {
        super(user_id, first_name, last_name, phone_number, username, password, email);
    }

    abstract validatePassword(username: string, password: string): number;
}

export default AdminInterface;