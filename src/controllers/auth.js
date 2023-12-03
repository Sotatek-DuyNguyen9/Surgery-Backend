import { internalServerError } from "../middlewares/handle-errors";
import * as services from "../services";

export const register = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password)
      return res.status(400).json({
        err: 1,
        message: "Missing email or password",
      });
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password)
      return res.status(400).json({
        err: 1,
        message: "Missing email or password",
      });
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(req, res);
  }
};
