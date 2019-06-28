const Product = require('../models/product.model');

exports.count_sells = (req ,res , next) => {
  let id =  req.params.productId;
  count = 1;
  console.log(id);
  Product.findById(id)
      .then(product => {
          console.log(product);
          let sells = new Product({
              selledCount : count++
          });
          sells.save()
              .then(result => {
                  res.status(200).json({
                      result
                  })
              })
              .catch(err => {
                  res.status(500).json({
                      message: 'unable to increment sells',
                      error: err
                  })
              })
      })
      .catch(err => {
          res.status(404).json({
              message: `unable to find product with id ${id}`,
              error: err
          })
      })
};
