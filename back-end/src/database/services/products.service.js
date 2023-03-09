const { Products }  = require('../models');

const findProducts = async () => {
  const products = await Products.findAll();
  return { status: 200, message: products };
};

const findProductById = async (id) => {
  const product = await Products.findByPk(id);
  if (!product) return { status: 404, message: "Not found" };

  return { status: 200, message: product };
};

const updateProductById = async (id, data) => {
  await Products.update(data, { where: { id } });

  const updated = await findProductById(+id);
  if (!updated) return res.status(404).json({ message: 'Not found' });

  return { status: 200, message: updated };
};

const destroyProduct = async (id) => {
  const removed = await Products.destroy({ where: { id } });
  if(!removed) return res.status(404).json({ message: 'Not found' });
  
  return { status: 202, message: removed };
};

const createProduct = async (product) => {
  const created = await Products.create(product);

  return { status: 200, message: created };
};

module.exports = {
  findProducts,
  findProductById,
  updateProductById,
  destroyProduct,
  createProduct,
};