'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurgeryType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // SurgeryType.belongsToMany(models.DoctorMajor, {
      //   through: 'DoctorMajor',
      //   targetKey: 'SurgerytypeId',
      // });
    }
  }
  SurgeryType.init(
    {
      name: DataTypes.STRING,
      expectedTime: DataTypes.NUMBER,
      priority: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'SurgeryType',
    }
  );
  return SurgeryType;
};
