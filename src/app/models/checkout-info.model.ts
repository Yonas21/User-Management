export class CheckoutInfoModel {
    _id: string;
    productInfo: string;
    userInfo: string;
    firstName: string;
    email: string;
    phone: string;
    productName: string;
    constructor(_id, productInfo, userInfo, firstName, email, phone, productName) {
        this.productInfo = productInfo;
        this.userInfo = userInfo;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.productName = productName;
    }
}
