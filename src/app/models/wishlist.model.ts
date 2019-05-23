export class WishlistModel {
    _id: string;
    item: string;
    owner: string;

    constructor(id, item, owner) {
        this._id = id;
        this.item = item;
        this.owner = owner;
    }
}
