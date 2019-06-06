export class CommentModel {
    commentDate: Date;
    _id: string;
    email: string;
    phone: string;
    message: string;

    constructor(commentDate, _id, email, phone, message) {
        this.commentDate = commentDate;
        this._id = _id;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }
}
