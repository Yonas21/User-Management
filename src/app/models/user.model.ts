export class UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    birthDay: string;
    gender: string;
    email: string;
    phoneNo: string;
    address: string;
    role: string;

    constructor(_id, email, password, role) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
