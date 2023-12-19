import db from '../models';
import { Op } from 'sequelize';
import { badRequest } from '../middlewares/handle-errors';

export const getDoctorMajors = ({
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

      const response = await db.DoctorMajor.findAndCountAll({
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

export const getDoctorMajorById = (id, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorMajor.findOne({ where: { id } });

      if (response)
        resolve({
          err: 0,
          messsage: 'Get data successfully',
          data: response,
        });
      else badRequest(`No doctor major with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const createNewDoctorMajor = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorMajor.create(body);

      resolve({
        err: 0,
        messsage: 'Create doctor major successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const updateDoctorMajor = (id, body, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorMajor.update(body, { where: { id } });

      if (response[0] > 0)
        resolve({
          err: 0,
          messsage: 'Update doctor major successfully',
        });
      else badRequest(`No doctor major with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const deleteDoctorMajors = (idArr, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DoctorMajor.destroy({ where: { id: idArr } });

      if (response > 0)
        resolve({
          err: 0,
          messsage: `${response} doctor major has been deleted`,
        });
      else badRequest(`No doctor major found to delete!`, res);
    } catch (error) {
      reject(error);
    }
  });
