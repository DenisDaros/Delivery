const salesService  = require('../services/sales.service');

const postSales = async (req, res) => {
    const saleData = req.body;
  
    const saleCreated = await salesService.createSale(saleData);
    
    return res.status(saleCreated.status).json(saleCreated.message);
  };

const getSales = async (_req, res) => {
    const sales = await salesService.findSales();
    
    return res.status(sales.status).json(sales.message);
  };

const getSaleById = async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.findSaleById(id);
    
    return res.status(sale.status).json(sale.message);
};

const patchSale = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    const updated = await salesService.updateSale(id, data);
    
    return res.status(updated.status).json(updated.message);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;

    const removed = await salesService.destroySale(id);
    
    return res.status(removed.status).json(removed.message);
};

module.exports = {
    postSales,
    getSaleById,
    getSales,
    patchSale,
    deleteSale,
};