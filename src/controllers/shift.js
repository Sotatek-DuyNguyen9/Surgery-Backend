import { internalServerError, badRequest } from "../middlewares/handle-errors";
import * as services from "../services";

export const getShifts = async (req, res) => {
  try {
    const response = await services.getShifts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const createNewShift = async (req, res) => {
  try {
    // if (!req.body.dayInWeek || !req.body.startDate || !req.body.endData) {
    //   return badRequest("Missing payload", res);
    // }

    const response = await services.createNewShift(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const updateShift = async (req, res) => {
  try {
    const response = await services.updateShift(req.params.id, req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const deleteShifts = async (req, res) => {
  try {
    const response = await services.deleteShifts(req.body.idArr, res);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};