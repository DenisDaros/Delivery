const Sequelize = require('sequelize');
const config = require('../config/config');

const { Products, User, Sales, SalesProducts } = require('../models');

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const findSaleById = async (id) => {
    const sale = await Sales.findOne({
      where: { id },
      include: [
        {
          model: SalesProducts,
          as: 'salesProducts',
          attributes: { exclude: ['saleId'] },
        },
        {
          model: Products,
          as: 'products',
          through: { attributes: [] },
        },
      ],
    });
  
    if (!sale) return res.status(404).json({ message: 'Sale does not exist' });

    const products = sale.products.map((p,i) => ({
        name: p.name,
        price: p.price,
        quantity: sale.salesProducts[i].quantity,
    }));

    const { salesProducts: _, ...saleObject } = sale.dataValues;

    return { status: 200, message: { ...saleObject, products } };
  };

const createSale = async (body) => {
    try {
      const { products, ...saleData } = body;
  
      const saleCreated = await sequelize.transaction(async (t) => {   
        const sale = await Sales.create({ ...saleData }, { transaction: t });
  
        await Promise.all(products.map(async (product) => SalesProducts
          .create({ ...product, saleId: sale.id}, { transaction: t })));
  
        return sale.id;
      });
  
      const result = findSaleById(saleCreated);

      return { status: 201, message: result };
      
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

const findSales = async () => {
    const sales = await Sales.findAll({
        include: [
        {
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        },
        {
            model: Products,
            as: 'products',
        },
        ],
    });

    return { status: 200, message: sales };
  };

const updateSale = async (id, data) => {
    await Sales.update(data, { where: { id } });
    
    const updated = await findSaleById(+id);
    if(!updated) return res.status(404).json({ message: 'Not found' });

    return { status: 200, message: updated };
};

const destroySale = async (id) => {
    const removed = await Sales.destroy({ where: { id } });
    if(!removed) return res.status(404).json({ message: 'Not found' });
    
    return { status: 204, message: removed };
}

  module.exports = {
    createSale,
    findSales,
    findSaleById,
    updateSale,
    destroySale,
  };