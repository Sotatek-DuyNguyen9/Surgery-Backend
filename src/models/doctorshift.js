'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorShift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  DoctorShift.init(
    {
      DoctorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'doctors',
          key: 'id',
        },
      },
      ShiftId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'shifts',
          key: 'id',
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DoctorShift',
    }
  );
  return DoctorShift;
};
