const Checkout = require("../models/checkout.model");
const mongoose = require("mongoose");

exports.get_all_checkout_info = (req, res, next) => {
    Checkout.find()
        .exec()
        .then(checkouts => {
            res.status(200).json(checkouts);
        })
        .catch(err => {
            res.status(404).json(err);
        });
};
exports.add_checkout_info = (req, res, next) => {

    const id = req.params.checkoutId;
    const[username, product] = id.split(' ');

    let checkout = new Checkout({
        _id: new mongoose.Types.ObjectId(),
        productInfo: product,
        userInfo: username
    });
    checkout
        .save()
        .then(result => {
            res.status(201).json({
                message: "checkout info added",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.delete_checkout_info = (req, res, next) => {
    let id = req.params.checkoutId;
    console.log(id);
    Checkout.findByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: "Checkout info successfully deleted.",
                result: result
            });
        })
        .catch(err => {
            res.status(404).json(err);
        });
};
