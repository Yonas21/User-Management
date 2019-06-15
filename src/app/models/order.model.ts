export class OrderModel {
    quantity: string;
    _id: string;
    name: string;
    description: string;
    productImage: string;

    constructor(quantity, _id, name, description, productImage) {
        this.quantity = quantity;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.productImage = productImage;
    }
}
