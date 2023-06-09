const salesService = require('../services/sales.service');

const postSales = async (req, res) => {
    const saleData = req.body;
    const saleCreated = await salesService.createSale(saleData);
    return res.status(201).json(saleCreated.id);
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
    if (!updated) return res.status(404).json({ message: 'Not found' });   
    return res.status(updated.status).json(updated.message);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;

    const removed = await salesService.destroySale(id);
    if (!removed) return res.status(404).json({ message: 'Not found' });

    return res.status(204).json();
};

module.exports = {
    postSales,
    getSaleById,
    getSales,
    patchSale,
    deleteSale,
};