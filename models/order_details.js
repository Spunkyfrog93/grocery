module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_details', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    freezeTableName: true,
  });
  order_details.associate = function(models) {
    order_details.belongsTo(models.orders, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
};
