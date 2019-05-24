const mongoose = require("mongoose");
const Wish = require("../models/wishlist.model");
const Product = require('../models/product.model');
const User = require('../models/user.model');

exports.get_all_wishes = (req, res, next) => {
    Wish.find()
        .populate('item owner')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({
                message: "unable to find data",
                error: err
            });
        });
};

exports.get_one_wish = (req, res, next) => {
    let id = req.params.wishId;
    Wish.findById(id)
        .exec().then(result => {
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
    //check if the product we want to order is exist.
    let id = req.params.productId;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: `Product not found`
                });
            }
            console.log(product);
            console.log(req.body.userId);
            let wish = new Wish({
                _id: mongoose.Types.ObjectId(),
                item: id
            });

            return wish
                .save()
                .then(result => {
                    res.status(201).json(result);
                })
                .catch(err => {
                    console.log("unable to save orders." + err);
                    res.status(500).json({
                        message: "unable to save to the database.",
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find the product with id ${id}`,
                error: err
            });
        });
};


exports.delete_wishlist = (req, res, next) => {
    let id = req.params.id;
    Wish.findByIdAndRemove(id).exec()
        .then(result => {
            res.status(200).json({
                message: `wishlist with id of ${id} is successfully deleted.`,
                request: {
                    type: 'Get',
                    message: 'the remaining wishes',
                    url: 'http://localhost:4000/wishes'
                }
            })
        })
        .catch();
};


