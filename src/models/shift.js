'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Shift.belongsToMany(models.Doctor, { through: "DoctorShift" });
    }
  }
  Shift.init(
    {
      dayInWeek: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Shift',
    }
  );
  return Shift;
};
