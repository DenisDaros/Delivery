const { getProducts } = require('../services/product.service');

const products = async (_req, res) => {
    const result = await getProducts();
    return res.status(200).json(result);
};

module.exports = {
  products,
};