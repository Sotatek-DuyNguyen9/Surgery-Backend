import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getDoctorMajors = async (req, res) => {
  try {
    const response = await services.getDoctorMajors(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(req, res);
  }
};

export const createNewDoctorMajor = async (req, res) => {
  try {
    const response = await services.createNewDoctorMajor(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getDoctorMajorById = async (req, res) => {
  try {
    const response = await services.getDoctorMajorById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateDoctorMajor = async (req, res) => {
  try {
    const response = await services.updateDoctorMajor(
      req.params.id,
      req.body,
      res
    );
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteDoctorMajors = async (req, res) => {
  try {
    const response = await services.deleteDoctorMajors(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
