const mongoose = require("mongoose");

let Order = require("../models/order.model");
let Product = require("../models/product.model");

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select("quantity _id product")
        .populate('product')
        .exec()
        .then(results => {
            res.status(200).json({
                count: results.length,
                orders: results.map(result => {
                    return {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:4000/orders/" + result._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(404).json({
                message: "unable to find orders",
                error: err
            });
        });
};

exports.orders_create_order = (req, res, next) => {
    //check if the product we want to order is exist.
    let id = req.body.productId;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: `Product not found`
                });
            }

            let order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });

            return order
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

exports.orders_get_one = (req, res, next) => {
    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    message: "find all orders",
                    url: "http://localhost:4000/orders/"
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find order with id ${req.params.orderId}`,
                error: err
            });
        });
};

exports.delete_order = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: ` no order with id ${req.params.orderId} found.`
                });
            }
            res.status(200).json({
                message: "order successfully deleted.",
                request: {
                    type: "GET",
                    message: "find all remaining orders",
                    url: "http://localhost:4000/orders/"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to delete`,
                error: err
            });
        });
};
