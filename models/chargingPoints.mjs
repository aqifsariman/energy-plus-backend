export default function chargingPoints(sequelize, DataTypes) {
  return sequelize.define('charging_points', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    connector: {
      type: DataTypes.TEXT,
    },
    lat: {
      type: DataTypes.NUMERIC,
      unique: true,
    },
    lng: {
      type: DataTypes.NUMERIC,
      unique: true,
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
