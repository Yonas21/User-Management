const mongoose = require('mongoose');
const Review = require('../models/review.model');
const User = require('../models/user.model');


//find all reviews and comments
exports.get_all_comments = (req, res, next) => {
    Review.find()
        .exec()
        .then(results => {
            res.status(200).json({
                message: 'result found',
                result: results
            })
        })
        .catch(err => {
            res.status(404).json({
                message:'unable to find products',
                error: err
            })
        });
};

exports.get_a_comment = (req, res, next) => {
    const id = req.params.commentId;

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

exports.create_a_comment = (req, res, next) => {
      const id = req.body.userId;
      User.findById(id)
          .exec()
          .then(user => {
              if (!user){
                  res.status(404).json({
                      message: 'unable to find any user'
                  })
              }
              let review = new Review({
                  _id: mongoose.Schema.ObjectId(),
                  reviewedBy: req.body.userId,
                  product: req.body.productId,
                  rate: req.body.rate,
                  comment: req.body.comment
              });
              review.save()
                  .then(result => {
                      res.status(201).json({
                          message: 'comment added successfully',
                          result: result
                      })
                  })
                  .catch(err => {
                      res.status(500).json({
                          message: 'unable to add a comment',
                          error: err
                      })
                  })
          })
          .catch(err => {
              res.status(404).json({
                  message: 'no user found',
                  error: err
              })
          })
};

exports.delete_a_comment = (req, res, next) => {
    const id = req.body.commentId;
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
