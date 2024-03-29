import { internalServerError, badRequest } from '../middlewares/handle-errors';
import * as services from '../services';
import joi from 'joi';
import { email, password } from '../helper/joi-schema';

export const register = async (req, res) => {
  try {
    // const { error } = joi.object({ email, password }).validate(req.body);
    // if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.register(req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(req, res);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.login(req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(req, res);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const response = await services.updatePassword(req.body, res);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(req, res);
  }
};
