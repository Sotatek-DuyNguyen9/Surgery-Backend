import db from '../models';
import { Op } from 'sequelize';
import { badRequest } from '../middlewares/handle-errors';

export const getPatients = ({
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

      const response = await db.Patient.findAndCountAll({
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

export const getPatientById = (id, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Patient.findOne({ where: { id } });

      if (response)
        resolve({
          err: 0,
          messsage: 'Get patient data successfully',
          data: response,
        });
      else badRequest(`No patient with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const createNewPatient = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Patient.create(body);

      resolve({
        err: 0,
        messsage: 'Create patient successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const updatePatient = (id, body, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Patient.update(body, { where: { id } });

      if (response[0] > 0)
        resolve({
          err: 0,
          messsage: 'Update patient successfully',
        });
      else badRequest(`No Patient with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const deletePatients = (idArr, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Patient.destroy({ where: { id: idArr } });

      if (response > 0)
        resolve({
          err: 0,
          messsage: `${response} patients has been deleted`,
        });
      else badRequest(`No patient found to delete!`, res);
    } catch (error) {
      reject(error);
    }
  });
