export class CartModel {
    _id: string;
    item: string;
    name: string;
    price: string;
    productImage: string;
    constructor(_id, item, name, price, productImage) {
        this._id = _id;
        this.item = item;
        this.name = name;
        this.price = price;
        this.productImage = productImage;
    }
}
