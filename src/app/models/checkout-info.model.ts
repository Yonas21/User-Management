export class CheckoutInfoModel {
    _id: string;
    productInfo: string;
    userInfo: string;
    constructor(_id, productInfo, userInfo) {
        this.productInfo = productInfo;
        this.userInfo = userInfo;
    }
}
