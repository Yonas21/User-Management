const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
// const jwt_decoded = require('jwt-decode');

exports.register = (req, res) => {
    //check if the email is present
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already Exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        let user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            password: hash,
                            birthday: req.body.birthday,
                            gender: req.body.gender,
                            email: req.body.email,
                            phoneNo: req.body.phoneNo,
                            address: req.body.address,
                            initialBalance: req.body.initial
                        });

                        //save to the database
                        user.save()
                            .then(() => {
                                res.status(200).json({
                                    user: "You signed up successfully"
                                });
                            })
                            .catch(err => {
                                res.status(404).send(`unable to signup ${err}`);
                            });
                    }
                });
            }
        });
};

exports.authenticate = (req, res) => {
    User.find({ email: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed"
                });
            } else {
                bcrypt.compare(
                    req.body.password,
                    user[0].password,
                    (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: "Authorization Failed"
                            });
                            console.log(
                                `${req.body.email} + ${req.body.password}`
                            );
                        }
                        if (result) {
                            const payload = {
                                email: user[0].email,
                                userId: user[0]._id,
                                role: user[0].role,
                                name: user[0].firstName
                            };
                            const token = jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "12h"
                                }
                            );
                            //let decoded  = jwt_decoded(token);
                            return res.status(200).json({
                                message: "Authorized",
                                token: token,
                                role: payload.role,
                                username: payload.name,
                                balance: user[0].initialBalance
                            });
                        }

                        res.status(401).json({
                            message: "Authorization Failed"
                        });
                        console.log(
                            `${req.body.username} + ${req.body.password}`
                        );
                    }
                );
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_one_user = (req, res, next) => {
  User.find({email: req.params.username})
      .then(result => {
          res.status(200).json(result)
      })
      .catch(err => {
          res.status(404).json(err)
      })
};
//just if the admin want to delete the user
exports.logout = (req, res) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getAllUsers = (req, res) => {
    User.find()
        .exec()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(404).json({
                message: "no user found",
                error: err
            });
        });
};

exports.update_balance = (req, res, next) => {
    let username = req.body.username;
    User.find({email: req.body.username})
    .exec().
    then(userDetails => {
        User.findById(userDetails[0]._id)
        .then(result => {
             result.initialBalance = req.body.balance;
             result.save(function(err, updateResult) {
                 res.status(201).json({
                     message: `balance updated succcessfully.`,
                     result: updateResult
                 });
             })
        })
        .catch(err => {
             res.json(err);
        })
    })
    .catch(err => {
        res.json(err);
    })
};
