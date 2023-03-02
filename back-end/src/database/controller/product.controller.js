const { findProducts, findProductById, updateProductById, destroyProduct, createProduct } = require('../services/product.service');

const getProducts = async (_req, res) => {
  const result = await findProducts();
  return res.status(200).json(result);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const product = await findProductById(id);

  return res.status(200).json(product);
}

const putProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await updateProductById(id, data);
  if (!updated) return res.status(404).json({ message: 'Not found' });

  return res.status(200).json(updated);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const removed = await destroyProduct(id);
  if(!removed) return res.status(404).json({ message: 'Not found' });

  return { status: 202, message: removed };
};

const postProduct = async (req, res) => {
  const product = req.body;

  const created = await createProduct(product);

  return res.status(201).json(created);
}

module.exports = {
  getProducts,
  getProductsById,
  putProduct,
  deleteProduct,
  postProduct,
};