import db from "../models";
import { Op } from "sequelize";

export const createNewShift = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(body);
      const response = await db.Shift.create(body);

      resolve({
        err: 0,
        messsage: "Create shift successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
