const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
let router = express.Router();

//filter the kinds of images to be stored.
const imageFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 10,
    fileFilter: imageFilter
});
let Product = require("../models/product.model");

//get all the products
router.get("/", (req, res, next) => {
    Product.find()
        .select("name price _id productImage")
        .exec()
        .then(results => {
            const response = {
                count: results.length,
                products: results.map(result => {
                    return {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        productImage: result.productImage,
                        request: {
                            type: "GET",
                            url: "http://localhost:4000/products/" + result._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find any data`,
                error: err
            });
        });
});

//add a product
router.post("/", checkAuth , upload.single("productImage"), (req, res, next) => {
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
});

//find the individual products
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .select("name price _id")
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Product with Id ${id}`,
                response: {
                    result: result,
                    request: {
                        type: "GET",
                        description: "Get all Products",
                        url: "http://localhost:4000/products/"
                    }
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find data with this ${id}`,
                Error: err
            });
        });
});

//update the individual products
router.patch("/:productId", checkAuth, (req, res, next) => {
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
});

//update the individual products
router.delete("/:productId",checkAuth,  (req, res, next) => {
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
});

module.exports = router;
