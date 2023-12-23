'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Setting.init(
    {
      timeWeight: DataTypes.INTEGER,
      priorityWeight: DataTypes.INTEGER,
      workingWeight: DataTypes.INTEGER,
      movementWeight: DataTypes.INTEGER,
      limitBreakTime: DataTypes.INTEGER,
      patientNotification: DataTypes.BOOLEAN,
      patientNotiBefore: DataTypes.INTEGER,
      doctorNotification: DataTypes.BOOLEAN,
      doctorNotiBefore: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Setting',
    }
  );
  return Setting;
};
