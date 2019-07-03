const Contact = require('../models/contact.model');
const mongoose = require('mongoose');
exports.get_all_contact_infos = (req, res, next) => {
    Contact.find().exec(function (err, doc) {
        if (err) {
            res.status(404).json({
                message: 'unable to find any docs',
                error: err
            })
        }  else {
            res.status(200).json(doc)
        }
    })
};

exports.contact_us = (req, res, next) => {
    let contact  = new Contact({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    contact.save().then(result => {
        res.status(201).json({
            message: 'contact info Sent',
            result: result
        })
    }).catch(err => {
        res.status(500).json(err)
    })
};

exports.delete_contact = (req, res, next) => {
    let id = req.params.id;
    Contact.findOneAndRemove(id)
        .then(result => {
            res.status(201).json({
                message: 'contact deleted successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to delete contact info',
                error: err
            })
        })
}
