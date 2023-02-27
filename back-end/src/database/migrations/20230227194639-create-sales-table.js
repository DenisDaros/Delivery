'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('sales', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'user_id',
        },
        sellerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'seller_id',
        },
        totalPrice: {
          type: Sequelize.DECIMAL(9,2),
          allowNull: false,
          field: 'total_price',
        },
        deliveryAdress: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'delivery_adress',
        },
        deliveryNumber: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'delivery_number',
        },
        saleDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          field: 'sale_date',
        },
        status: {
          type: Sequelize.STRING,
        },
      })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales')
  }
  
};