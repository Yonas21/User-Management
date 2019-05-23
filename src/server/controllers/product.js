const mongoose = require('mongoose');

let Product = require('../models/product.model');

exports.get_all_products = (req, res, next) => {
    Product.find()
        .select("name price _id productImage")
        .exec()
        .then(results => {
            // const response = {
            //     count: results.length,
            //     products: results.map(result => {
            //         return {
            //             name: result.name,
            //             price: result.price,
            //             _id: result._id,
            //             productImage: result.productImage,
            //             request: {
            //                 type: "GET",
            //                 url: "http://localhost:4000/products/" + result._id
            //             }
            //         };
            //     })
            // };
             res.status(200).json(results);
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find any data`,
                error: err
            });
        });
};

exports.create_product = (req, res, next) => {
    //set up the inputs for the database
    let product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    product
        .save()
        .then(result => {
            res.status(201).json({
                message: `Product Created Successfully.`,
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:4000/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(`unable to save ${err}`);
            res.status(404).json({
                Error: err
            });
        });
};

exports.get_one_product = (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .select("name price _id productImage")
        .exec()
        .then(result => {
            // res.status(200).json({
            //     message: `Product with Id ${id}`,
            //     response: {
            //         result: result,
            //         request: {
            //             type: "GET",
            //             description: "Get all Products",
            //             url: "http://localhost:4000/products/"
            //         }
            //     }
            // });
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find data with this ${id}`,
                Error: err
            });
        });
};

exports.update_product = (req, res, next) => {
    let id = req.params.productId;
    Product.findOneAndUpdate(id, {
        $set: { name: req.body.newName, price: req.body.newPrice }
    })
        .exec()
        .then(result => {
            res.status(201).json({
                message: `Product with id ${id} successfully updated.`,
                result: result,
                request: {
                    type: "GET",
                    url: "http://localhost:4000/products/" + id
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

exports.delete_product = (req, res, next) => {
    let id = req.params.productId;
    Product.findByIdAndRemove(id)
        .exec()
        .then(() => {
            res.status(200).json({
                message: `product with id ${id} successfully deleted.`
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to delete.`
            });
        });
};
