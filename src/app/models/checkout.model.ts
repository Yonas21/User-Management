export class CheckoutModel {
    message: string;
    token: string;
    role: string;
    username: string;
    balance: number;
    constructor(message: string, token: string, role: string, username: string, balance: number) {
        this.message = message;
        this.token = token;
        this.role = role;
        this.username = username;
        this.balance = balance;
    }
}
