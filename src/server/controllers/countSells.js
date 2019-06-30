const Product = require('../models/product.model');

exports.count_sells = (req ,res , next) => {
  let id =  req.params.productId;
  // let count = 1;
  console.log(id);
  Product.findById(id).then(result => {
      console.log('result ', result);
      console.log('going to set selledCount ', Number(result.selledCount) + 1);
      result.selledCount += 1;
      result.save(function(err, response){
          console.log('err ', err);
          console.log('response ', response);
          res.status(201).json({response});

      })
  })

};

exports.findSelledProducts = (req, res, next) => {

    Product.find().limit(2).sort({selledCount: -1}).exec(function (err, posts) {
        if (err) {
            res.status(404).json({err})
        }
        res.status(200).json(posts);
    });

};
