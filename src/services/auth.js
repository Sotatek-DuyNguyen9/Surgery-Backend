import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Doctor.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role: response[0].role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
          )
        : null;
      resolve({
        err: response[1] ? 0 : -1,
        messsage: response[1]
          ? 'Register successfully'
          : 'Email is already registered',
        accessToken: token,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Doctor.findOne({
        where: { email },
        raw: true, //get object, not instance of squezelize
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role: response.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        data: {
          messsage: token
            ? 'Login is successfully'
            : 'Email or password wrong!',
          access_token: token,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
