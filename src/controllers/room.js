import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';

export const getRooms = async (req, res) => {
  try {
    const response = await services.getRooms(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewRoom = async (req, res) => {
  try {
    const response = await services.createNewRoom(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const getRoomById = async (req, res) => {
  try {
    const response = await services.getRoomById(req.params.id, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const response = await services.updateRoom(req.params.id, req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteRooms = async (req, res) => {
  try {
    const response = await services.deleteRooms(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
