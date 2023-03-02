module.exports = (sequelize, DataTypes) => {
    const SalesProducts = sequelize.define('SalesProducts', {
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'sales_products',
      modelName: 'SalesProducts',
    });
  
    SalesProducts.associate = (models) => {
      models.Sales.belongsToMany(models.Products, {
        as: 'products',
        through: SalesProducts,
        foreignKey: 'saleId',
        otherKey: 'productId',
      });
  
      models.Products.belongsToMany(models.Sales, {
        as: 'sales',
        through: SalesProducts,
        foreignKey: 'productId',
        otherKey: 'saleId',
      });
    };
  
    return SalesProducts;
  };