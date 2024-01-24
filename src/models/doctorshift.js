'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorShift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorShift.belongsTo(models.Shift, {
        as: 'shiftData',
        foreignKey: 'ShiftId',
      });
    }
  }
  DoctorShift.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      DoctorId: DataTypes.INTEGER,
      ShiftId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DoctorShift',
    }
  );
  return DoctorShift;
};
