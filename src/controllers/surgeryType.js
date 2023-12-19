import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getSurgeryTypes = async (req, res) => {
  try {
    const response = await services.getSurgeryTypes(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewSurgeryType = async (req, res) => {
  try {
    const response = await services.createNewSurgeryType(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getSurgeryTypeById = async (req, res) => {
  try {
    const response = await services.getSurgeryTypeById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateSurgeryType = async (req, res) => {
  try {
    const response = await services.updateSurgeryType(
      req.params.id,
      req.body,
      res
    );
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteSurgeryTypes = async (req, res) => {
  try {
    const response = await services.deleteSurgeryTypes(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
