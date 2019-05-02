const express = require('express');
let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let userRoutes = express.Router();
const jwt = require('jsonwebtoken');

//import the user model we going to work with
let User = require('../models/user.model');

//define the store route
userRoutes.route('/signup').post((req,res) => {
    //check if the email is present
    User.find({email:req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message:'Email already Exists'
            });
        } else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
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
                        address: req.body.address
                    });

                    //save to the database
                    user.save().then(()=>{
                        res.status(200).json({'user':'You signed up successfully'});
                    }).catch((err) => {
                        res.status(404).send(`unable to signup ${err}`);
                    })
                }
            })
        }
    })



});

//log into our account
userRoutes.route('/login').post((req,res) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Failed'
                });
            } else {
                bcrypt.compare(req.body.password,user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Authorization Failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, "website",
                            {
                                expiresIn: "1h"
                            });

                        return res.status(200).json({
                            message: 'Authorized',
                            token: token
                        });
                    }

                    res.status(401).json({
                        message: 'Authorization Failed'
                    });
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

//delete the user route handler
userRoutes.route('/:userId').delete((req,res) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'User Deleted'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = userRoutes;
