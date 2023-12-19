'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsToMany(models.Shift, {
        through: 'DoctorShift',
        as: 'shiftData',
      });
      Doctor.belongsToMany(models.SurgeryType, {
        through: 'DoctorMajor',
        as: 'majorData',
      });
    }
  }
  Doctor.init(
    {
      name: DataTypes.STRING,
      major: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Doctor',
    }
  );
  return Doctor;
};
