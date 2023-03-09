const { findProducts, findProductById, updateProductById, destroyProduct, createProduct } = require('../services/product.service');

const getProducts = async (_req, res) => {
  const result = await findProducts();
  
  return res.status(result.status).json(result.message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const product = await findProductById(id);

  return res.status(product.status).json(product.message);
}

const putProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await updateProductById(id, data);
  
  return res.status(updated.status).json(updated.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const removed = await destroyProduct(id);
  
  return { status: removed.status, message: removed.message };
};

const postProduct = async (req, res) => {
  const product = req.body;

  const created = await createProduct(product);

  return res.status(created.status).json(created.message);
}

module.exports = {
  getProducts,
  getProductsById,
  putProduct,
  deleteProduct,
  postProduct,
};