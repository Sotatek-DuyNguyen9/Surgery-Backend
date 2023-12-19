import db from '../models';
import { Op } from 'sequelize';
import { badRequest } from '../middlewares/handle-errors';

export const getSurgeries = ({
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

      const response = await db.Surgery.findAndCountAll({
        where: query,
        limit: fLimit,
        offset: fPage * fLimit,
        order: checkOrderRequired ? [[sortBy, sortDirection]] : [],
        include: [
          {
            model: db.Room,
            as: 'roomData',
            attributes: ['id', 'name'],
          },
          {
            model: db.Doctor,
            as: 'doctorData',
            attributes: ['id', 'name'],
          },
          {
            model: db.Patient,
            as: 'patientData',
            attributes: ['id', 'name'],
          },
          {
            model: db.SurgeryType,
            as: 'surgeryTypeData',
            attributes: ['id', 'name'],
          },
        ],
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

export const getSurgeryById = (id, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Surgery.findOne({ where: { id } });

      if (response)
        resolve({
          err: 0,
          messsage: 'Get data successfully',
          data: response,
        });
      else badRequest(`No Surgery with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const createNewSurgery = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Surgery.create(body);

      resolve({
        err: 0,
        messsage: 'Create Surgery successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const updateSurgery = (id, body, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Surgery.update(body, { where: { id } });

      if (response[0] > 0)
        resolve({
          err: 0,
          messsage: 'Update Surgery successfully',
        });
      else badRequest(`No Surgery with id ${id} found!`, res);
    } catch (error) {
      reject(error);
    }
  });

export const deleteSurgeries = (idArr, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Surgery.destroy({ where: { id: idArr } });

      if (response > 0)
        resolve({
          err: 0,
          messsage: `${response} Surgeries has been deleted`,
        });
      else badRequest(`No Surgery found to delete!`, res);
    } catch (error) {
      reject(error);
    }
  });
