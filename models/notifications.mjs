export default function notificationsModel(sequelize, DataTypes) {
  return sequelize.define('notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    chargeComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lowBalance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    promosOffers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
