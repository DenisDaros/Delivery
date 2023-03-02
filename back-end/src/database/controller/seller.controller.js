const { getSellers } = require('../services/seller.service');

const sellers = async (_req, res) => {
    const result = await getSellers();
    return res.status(200).json(result);
};

module.exports = {
  sellers,
};