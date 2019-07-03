const Contact = require('../models/contact.model');

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
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description
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
