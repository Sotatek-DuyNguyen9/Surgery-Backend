import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getCurrent = async (req, res) => {
  try {
    const id = req.doctor?.id;
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getDoctors = async (req, res) => {
  try {
    const response = await services.getDoctors(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const response = await services.updateDoctor(req.params.id, req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteDoctors = async (req, res) => {
  try {
    const response = await services.deleteDoctors(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
