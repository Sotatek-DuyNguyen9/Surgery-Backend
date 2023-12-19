import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getDoctorShifts = async (req, res) => {
  try {
    const response = await services.getDoctorShifts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewDoctorShift = async (req, res) => {
  try {
    const response = await services.createNewDoctorShift(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getDoctorShiftById = async (req, res) => {
  try {
    const response = await services.getDoctorShiftById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateDoctorShift = async (req, res) => {
  try {
    const response = await services.updateDoctorShift(
      req.params.id,
      req.body,
      res
    );
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteDoctorShifts = async (req, res) => {
  try {
    const response = await services.deleteDoctorShifts(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
