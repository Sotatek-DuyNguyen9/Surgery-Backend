'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surgery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Surgery.belongsTo(models.Room, { foreignKey: 'RoomId', as: 'roomData' });
      Surgery.belongsTo(models.Doctor, {
        foreignKey: 'DoctorId',
        as: 'doctorData',
      });
      Surgery.belongsTo(models.Patient, {
        foreignKey: 'PatientId',
        as: 'patientData',
      });
      Surgery.belongsTo(models.SurgeryType, {
        foreignKey: 'SurgerytypeId',
        as: 'surgeryTypeData',
      });
    }
  }
  Surgery.init(
    {
      RoomId: DataTypes.INTEGER,
      DoctorId: DataTypes.INTEGER,
      PatientId: DataTypes.INTEGER,
      SurgerytypeId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      expectedEndDate: DataTypes.DATE,
      actualEndDate: DataTypes.DATE,
      status: DataTypes.STRING,
      priority: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Surgery',
    }
  );
  return Surgery;
};
