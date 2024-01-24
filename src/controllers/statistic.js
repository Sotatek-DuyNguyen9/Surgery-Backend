import { internalServerError } from '../middlewares/handle-errors';
import * as services from '../services';

export const getStatistic = async (req, res) => {
  try {
    const response = await services.getStatistic(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
