'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorMajor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  DoctorMajor.init(
    {
      DoctorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'doctors',
          key: 'id',
        },
      },
      SurgerytypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'surgerytypes',
          key: 'id',
        },
      },
      qualification: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DoctorMajor',
    }
  );
  return DoctorMajor;
};
