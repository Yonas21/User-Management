const mongoose = require('mongoose');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//find all reviews and comments
exports.get_all_reviews = (req, res, next) => {
    Review.find()
        .exec()
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(404).json({
                message:'unable to find products',
                error: err
            })
        });
};

exports.get_a_review = (req, res, next) => {
    const id = req.params.reviewId;

    Review.findById(id)
        .exec()
        .then(result => {
            res.status.json({
                message: 'a result found',
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find a comment',
                error: err
            })
        });

};

exports.create_a_review = (req, res, next) => {
      const id = req.body.token;
      let decoded = jwt.verify(id, process.env.JWT_SECRET);
      console.log(decoded);
      if (id.length > 0){
          let review = new Review({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              phone: req.body.phone,
              message: req.body.message,
              rate: req.body.rate,
              token: req.body.token
          });
          review.save()
              .then(result => {
                  res.status(201).json({
                      message: 'comment added successfully',
                      result: result,
                      username: decoded.name,
                      role: decoded.role
                  })
              })
              .catch(err => {
                  res.status(500).json({
                      message: 'unable to add a comment',
                      error: err
                  })
              })
      } else {
          res.status(500).json({
              message: 'You cannot give Comment, You Should Login First.'
          })
      }

};

exports.delete_a_review = (req, res, next) => {
    const id = req.params.reviewId;
    Review.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'deleted successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'unable to delete comment',
                error: err
            })
        })
};
