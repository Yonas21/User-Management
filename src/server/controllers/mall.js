const mongoose = require('mongoose');
const Mall = require('../models/mall.model');
let Shop = require('../models/shop.model');

exports.getMalls = (req, res, next) => {
    Mall.find().exec()
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find mall',
                error: err
            })
        });
};
exports.get_a_mall = (req, res, next) => {
    let id = req.params.mallId;
    Mall.findById(id).exec()
        .then(result => {
            res.status(200).json({
                message: 'mall found',
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find mall',
                error: err
            })
        });
};

exports.create_a_mall = (req, res, next) => {
    //check if the product we want to order is exist.
    let id = req.body.shopId;
    Shop.findById(id)
        .then(shop => {
            if (!shop) {
                res.status(404).json({
                    message: `Product not found`
                });
            }
            Mall.find({name: req.body.name}).exec().then(result => {
                if (result.length > 0){
                    res.status(500).json({
                        message: 'mall already exists',
                        result: result
                    })
                }
            });
            let mall = new Mall({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                address: req.body.address,
                contactNo: req.body.contactNo,
                shop: req.body.shopId,
                closing_hour: req.body.closing
            });

            return mall
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


exports.delete_a_mall = (req, res, next) => {
    let id = req.params.mallId;
    Mall.findByIdAndRemove(id).exec()
        .then(result => {
            res.status(200).json({
                message: 'deleted successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'unable to delete a mall',
                error: err
            })
        })
};
