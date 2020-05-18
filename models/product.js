module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      // eslint-disable-next-line new-cap
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  });
  product.associate = function(models) {
    product.belongsTo(models.product_category, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
};
