export class ContactModel {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;

    constructor(_id, name, email, subject, message) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
}
