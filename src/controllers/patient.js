import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getPatients = async (req, res) => {
  try {
    const response = await services.getPatients(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewPatient = async (req, res) => {
  try {
    const response = await services.createNewPatient(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getPatientById = async (req, res) => {
  try {
    const response = await services.getPatientById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updatePatient = async (req, res) => {
  try {
    const response = await services.updatePatient(req.params.id, req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deletePatients = async (req, res) => {
  try {
    const response = await services.deletePatients(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
