export class ReviewModel {
    email: string;
    message: string;
    phone: string;
    rate: string;
    reviewDate: string;
    token: string;
    _id: string;

    constructor(email, message, phone, rate, reviewDate, token, _id) {
        this.email = email;
        this.message = message;
        this.phone = phone;
        this.rate = rate;
        this.reviewDate = reviewDate;
        this.token = token;
        this._id = _id;
    }
}
