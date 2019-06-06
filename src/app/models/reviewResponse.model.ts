export class ReviewResponseModel {
    email: string;
    userId: string;
    role: string;
    name: string;

    constructor(email, userId, role, name) {
        this.email = email;
        this.userId = userId;
        this.role = role;
        this.name = name;
    }
}
