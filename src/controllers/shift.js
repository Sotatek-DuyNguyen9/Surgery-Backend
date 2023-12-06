import { internalServerError, badRequest } from "../middlewares/handle-errors";
import * as services from "../services";

export const createNewShift = async (req, res) => {
  try {
    // if (!req.body.dayInWeek || !req.body.startDate || !req.body.endData) {
    //   return badRequest("Missing payload", res);
    // }

    const response = await services.createNewShift(req.body);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(req, res);
  }
};
