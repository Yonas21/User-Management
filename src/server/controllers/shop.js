const mongoose = require('mongoose');
let Product = require('../models/product.model');
let Shop = require('../models/shop.model');

exports.get_all_shops = (req, res, next) => {
    Shop.find()
        .populate('item')
        .exec()
        .then(results => {
            res.status(200).json({
                message: 'founded shops',
                result: results
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any shop',
                error: err
            })
        })
};

exports.get_a_shop = (req, res, next) => {
    let id = req.params.shopId;
    Shop.findById(id).exec()
        .then(result => {
            res.status(200).json({
                message: 'a shop found',
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `product with id ${id} not found`,
                error: err
            })
        });
};

exports.create_a_shop = (req, res, next) => {
    //check if the product we want to order is exist.
    let id = req.body.productId;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: `Product not found`
                });
            }
            console.log(product);
            console.log(req.body.userId);
            let shop = new Shop({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                item: req.body.productId,
                contactNo: req.body.contactNo
            });

            console.log(req.body.ProductId);
            return shop
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

exports.delete_a_shop = (req,res, next) => {
    let id = req.params.shopId;
    Shop.findByIdAndRemove(id).exec()
        .then(result => {
            res.status(200).json({
                message: 'shop deleted successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to delete a shop',
                errorLabelContainer: err
            })
        })
};
