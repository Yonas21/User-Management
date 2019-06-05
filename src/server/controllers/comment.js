const Comment = require('../models/comment.model');

//get all comments found
exports.get_all_comments = (req, res, next) => {
    Comment.find()
        .exec()
        .then(comments => {
            res.status(200).json({
                message: 'Comments found',
                result: comments
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'no comment found',
                error: err
            })
        })
};

// get each comment
exports.get_a_comment = (req, res, next) => {
    let id = req.params.commentId;
    Comment.findById(id)
        .exec()
        .then(comment => {
            res.status(200).json({
                message: 'comment found',
                result: comment
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no comment found with id ${id}`,
                error: err
            })
        });
};

//add a comment
exports.create_a_comment = (req, res, next) => {
    let comment = new Comment({
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    comment.save()
        .then(result => {
            res.status(201).json({
                message: 'comment added successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'unable to add comment',
                error: err
            })
        })
};
//delete a comment
exports.delete_a_comment = (req, res, next) => {
    let id = req.params.commentId;
    Comment.FindByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: `comment with id ${id} is successfully deleted.`,
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to delete comment',
                error: err
            })
        });
};
