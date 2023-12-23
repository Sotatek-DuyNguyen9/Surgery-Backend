import { internalServerError } from '../middlewares/handle-errors';
import * as services from '../services';

export const getSettings = async (req, res) => {
  try {
    const response = await services.getSettings(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewSetting = async (req, res) => {
  try {
    const response = await services.createNewSetting(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getSettingById = async (req, res) => {
  try {
    const response = await services.getSettingById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateSetting = async (req, res) => {
  try {
    const response = await services.updateSetting(req.params.id, req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteSettings = async (req, res) => {
  try {
    const response = await services.deleteSettings(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
