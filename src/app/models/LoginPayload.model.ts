export class LoginPayloadModel {
    message: string;
    token: string;
    role: string;
    username: string;

    constructor(message, token, role, username) {
        this.message = message;
        this.token = token;
        this.role = role;
        this.username = username;
    }
}
