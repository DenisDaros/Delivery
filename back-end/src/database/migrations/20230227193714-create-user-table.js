'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING,
        }
      })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users')
  }
  
};
