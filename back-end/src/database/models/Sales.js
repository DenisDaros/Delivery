module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('Sales', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true},
      sellerId: { type: DataTypes.INTEGER, foreignKey: true},
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'sales',
    });
  
    Sales.associate = (models) => {
        Sales.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      };

    Sales.associate = (models) => {
        Sales.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
    };

    return Sales;
  };