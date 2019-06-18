export class ProductModel {
    _id: string;
    name: string;
    price: string;
    color: string;
    productImage: string;

    constructor(id, name, price, color, productImage) {
        this._id = id;
        this.name = name;
        this.price = price;
        this.color = color;
        this.productImage = productImage;
    }
}
