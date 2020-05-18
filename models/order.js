module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtotal: {
      // eslint-disable-next-line new-cap
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    tax: {
      // eslint-disable-next-line new-cap
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    shipping: {
      // eslint-disable-next-line new-cap
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    total_price: {
      // eslint-disable-next-line new-cap
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  });
};
