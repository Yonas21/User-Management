export class MallModel {
    closing_hour: string;
    _id: string;
    name: string;
    address: string;
    shop: string;
    contactNo: string;

    constructor(closing_hour, id, name, shop, address, contact) {
        this.closing_hour = closing_hour;
        this._id = id;
        this.name = name;
        this.shop = shop;
        this.address = address;
        this.contactNo = contact;
    }
}
