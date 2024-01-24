import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { badRequest } from '../middlewares/handle-errors';

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({ name, email, password }, res) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!email || !password)
        return badRequest('Thiếu email hoặc password', res);
      const response = await db.Doctor.findOrCreate({
        where: { email },
        defaults: {
          email,
          role: 'user',
          status: 'Chờ cập nhật',
          name: name || '',
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
      if (!response[1]) return badRequest('Email đã tồn tại', res);
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

export const login = ({ email, password }, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Doctor.findOne({
        where: { email },
        raw: true, //get object, not instance of squezelize
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password || '');

      if (!isChecked) return badRequest('Wrong email or password', res);

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

      delete response.password;

      resolve({
        err: token ? 0 : 1,
        message: 'Login successfully!',
        data: {
          ...response,
          access_token: token,
        },
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const updatePassword = ({ email, password, newPassword }, res) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Doctor.findOne({
        where: { email },
        raw: true, //get object, not instance of squezelize
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password || '');

      if (!isChecked) return badRequest('Wrong password', res);

      const updateResponse = await db.Doctor.update(
        { password: hashPassword(newPassword) },
        { where: { email } }
      );

      if (updateResponse[0] > 0)
        resolve({
          err: 0,
          messsage: 'Update password successfully',
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
