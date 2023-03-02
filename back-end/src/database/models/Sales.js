module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('Sales', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true},
      sellerId: { type: DataTypes.INTEGER, foreignKey: true},
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
     },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente',
      },
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'sales',
      modelName: 'Sales',
    });
  
    Sales.associate = (models) => {
        Sales.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Sales.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
        Sales.hasMany(models.SalesProducts, { foreignKey: 'saleId', as: 'salesProducts' });
      };

    return Sales;
  };