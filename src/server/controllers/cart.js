const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.get_all_products_in_cart = (req, res, next) => {
    Cart.find()
        .populate('item')
        .exec()
        .then(results => {
            res.status(200).json({
                message:'successful',
                result: results
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'error',
                error: error
            })
        })
};


exports.get_one_cart_product = (req, res, next) => {
    let id = req.params.id;
    Cart.findById(id).exec()
        .then(result => {
            res.status(200).json({
                message: 'successful',
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'error',
                error: err
            })
        })
};

exports.add_item_to_cart = (req, res, next)=>{
    let id = req.body.productId;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: `Product not found`
                });
            }

            let cart = new Cart({
                _id: mongoose.Types.ObjectId(),
                item: req.params.productId
            });

            cart.save().then(result => {
                res.status(201).json({
                    message: 'successfully saved',
                    result: result
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'unable to save to the database',
                    error: err
                })
            })
        }).catch(err => {
            res.status(404).json({
                message: 'product not found',
                error: err
            })
    })
};

exports.delete_item_from_cart = (req, res, next) => {
    let id = req.params.cartId;
    Cart.findByIdAndDelete(id).exec()
        .then(result => {
            res.status(200).json({
                message: 'deleted successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(304).json({
                message: 'unable to delete',
                error: err
            })
        });
};
