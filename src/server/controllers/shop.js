const mongoose = require('mongoose');
let Product = require('../models/product.model');
let Shop = require('../models/shop.model');

exports.get_all_shops = (req, res, next) => {
    Shop.find()
        .populate('item')
        .exec()
        .then(results => {
            res.status(200).json(results);
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
            res.status(200).json(result);
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
    let id = req.body.item;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: `Product not found`
                });
            }

            let shop = new Shop({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                item: req.body.item,
                contactNo: req.body.contactNo
            });

            console.log(req.body.name);
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
//update a shop
exports.update_shop = (req, res, next) => {
    let id = req.params.shopId;
    console.log(id);
    console.log(req.body.newName);
    Shop.findOneAndUpdate(id, {
        $set: {
            name: req.body.newName,
            item: req.body.newItem,
            contactNo: req.body.newContactNo
        }
    }).exec()
        .then(result => {
            res.status(201).json({
                message: `Shop with id ${id} successfully updated.`,
                result: result,
                request: {
                    type: "GET",
                    url: "http://localhost:4000/shop/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to update data`,
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
