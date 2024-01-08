import db from '../models';
import { Op } from 'sequelize';

export const getOne = (doctorId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Doctor.findOne({
        where: { id: doctorId },
        attributes: {
          exclude: ['password', 'color'],
        },
        include: [
          {
            model: db.Shift,
            as: 'shiftData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
          {
            model: db.SurgeryTypes,
            as: 'majorData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
        ],
      });
      resolve({
        err: response ? 0 : -1,
        messsage: response ? 'Find successfully' : 'User not found',
        userData: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getDoctors = ({
  page,
  limit,
  sortBy,
  sortDirection,
  name,
  ...query
}) =>
  new Promise(async (resolve, reject) => {
    try {
      if (name) query.name = { [Op.substring]: name };
      const fLimit = +limit || 100;
      const fPage = !page || +page <= 1 ? 0 : +page - 1;
      const checkOrderRequired = sortBy && sortDirection;
      const response = await db.Doctor.findAndCountAll({
        // raw: true,
        // nest: true,
        where: query,
        limit: fLimit,
        offset: fPage * fLimit,
        order: checkOrderRequired ? [[sortBy, sortDirection]] : [],
        attributes: {
          exclude: ['password', 'color'],
        },
        include: [
          {
            model: db.Shift,
            as: 'shiftData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
          {
            model: db.SurgeryType,
            as: 'majorData',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'expectedTime', 'priority'],
            },
            through: { attributes: [] },
          },
        ],
      });

      const totalItem = response?.rows?.length;

      resolve({
        err: response ? 0 : 1,
        messsage: response
          ? 'Get data doctor successfully'
          : 'Get data doctor failed',
        data: response?.rows,
        metadata: {
          totalItem: totalItem,
          totalPage: Math.round(totalItem / Math.min(fLimit, totalItem)),
        },
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
