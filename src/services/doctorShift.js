import db from '../models';
import { Op } from 'sequelize';
import { badRequest } from '../middlewares/handle-errors';

export const getDoctorShifts = ({
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

      const response = await db.DoctorShift.findAndCountAll({
        where: query,
        limit: fLimit,
        offset: fPage * fLimit,
        order: checkOrderRequired ? [[sortBy, sortDirection]] : [],
        // attributes: {
        //   exclude: ["password"],
        // },
      });

      const totalItem = response.count;

      resolve({
        err: response ? 0 : 1,
        messsage: response ? 'Get data successfully' : 'Get data failed',
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

export const getDoctorShiftById = (id, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorShift.findOne({ where: { id } });

      if (response)
        resolve({
          err: 0,
          messsage: 'Get doctor shift data successfully',
          data: response,
        });
      else badRequest(`No doctor shift with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const createNewDoctorShift = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorShift.create(body);

      resolve({
        err: 0,
        messsage: 'Create doctor shift successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const updateDoctorShift = (id, body, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorShift.update(body, { where: { id } });

      if (response[0] > 0)
        resolve({
          err: 0,
          messsage: 'Update doctor shift successfully',
        });
      else badRequest(`No doctor shift with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const deleteDoctorShifts = (idArr, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorShift.destroy({ where: { id: idArr } });

      if (response > 0)
        resolve({
          err: 0,
          messsage: `${response} doctor shifts has been deleted`,
        });
      else badRequest(`No doctor shift found to delete!`, res);
    } catch (error) {
      reject(error);
    }
  });
