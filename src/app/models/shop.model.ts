export class ShopModel {
    _id: string;
    name: string;
    item: string;
    contactNo: string;
    constructor(id, name, item, contactNo) {
        this._id = id;
        this.name = name;
        this.item = item;
        this.contactNo = contactNo;
    }
}
