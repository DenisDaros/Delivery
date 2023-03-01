const { Products } = require('../models')

const getProducts = async () => {
    const products = await Products.findAll();
    return products;
  };
  
  module.exports = {
    getProducts,
  };