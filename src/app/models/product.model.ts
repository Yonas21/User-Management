export class ProductModel {
    id: string;
    name: string;
    price: string;
    productImage: string;

    constructor(name, price, productImage) {
        this.name = name;
        this.price = price;
        this.productImage = productImage;
    }
}
