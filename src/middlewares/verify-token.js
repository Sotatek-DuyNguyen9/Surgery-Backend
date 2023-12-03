import jwt from 'jsonwebtoken';
import { unAuthorized } from './handle-errors';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) return unAuthorized('Authorization is required', res);

  const accessToken = token.split(' ')[1];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, doctor) => {
    if (err) return unAuthorized('Access token is invalid', res);

    req.doctor = doctor;
    next();
  })
}

export default verifyToken;