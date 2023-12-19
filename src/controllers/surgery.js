import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getSurgeries = async (req, res) => {
  try {
    const response = await services.getSurgeries(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewSurgery = async (req, res) => {
  try {
    const response = await services.createNewSurgery(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getSurgeryById = async (req, res) => {
  try {
    const response = await services.getSurgeryById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateSurgery = async (req, res) => {
  try {
    const response = await services.updateSurgery(req.params.id, req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteSurgeries = async (req, res) => {
  try {
    const response = await services.deleteSurgeries(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
