import db from "../models";

export const getOne = (doctorId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Doctor.findOne({
        where: { id: doctorId },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Shift,
            as: "shiftData",
            attributes: { exclude: ["createdAt", "updatedAt"]},
            through: {attributes: []}
          }, 
        ],
      });
      resolve({
        err: response ? 0 : -1,
        messsage: response ? "Find successfully" : "User not found",
        userData: response,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
