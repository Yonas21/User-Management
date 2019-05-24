export class ProductModel {
    _id: string;
    name: string;
    price: string;
    productImage: string;

    constructor(id, name, price, productImage) {
        this._id = id;
        this.name = name;
        this.price = price;
        this.productImage = productImage;
    }
}
