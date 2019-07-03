export class OrderModel {
    quantity: string;
    _id: string;
    name: string;
    description: string;
    phone: string;
    productImage: string;

    constructor(quantity, _id, name, description, phone, productImage) {
        this.quantity = quantity;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.productImage = productImage;
    }
}
