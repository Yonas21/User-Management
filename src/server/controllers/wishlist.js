const mongoose = require("mongoose");
const Wish = require("../models/wishlist.model");
const Product = (exports.get_all_wishes = (req, res, next) => {
    Wish.find()
        .exec()
        .then(result => {
            res.status(200).json({
                message: "wishlists",
                result: result
            });
        })
        .catch(err => {
            res.status(404).json({
                message: "unable to find data",
                error: err
            });
        });
});

exports.get_one_wish = (req, res, next) => {
    let id = req.params.id;
    Wish.findById(id)
        .exec.then(result => {
            res.status(200).json({
                message: "founded Result",
                result: result
            });
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find data with id ${id}`,
                error: err
            });
        });
};

exports.create_wishlist = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .then()
        .catch();
};
