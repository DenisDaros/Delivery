'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('sales_products', {
        saleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'sales',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'sale_id',
        },
        productId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'product_id',
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products')
  }
  
};
