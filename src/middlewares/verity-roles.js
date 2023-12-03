import { forbidden } from "./handle-errors";

export const isSuperAdmin = (req, res, next) => {
  const { role } = req.doctor;
  if (role !== 'admin') return forbidden('Role super admin is required', res);
  next();
}

export const isAdmin = (req, res, next) => {
  const { role } = req.doctor;
  if (role !== 'subadmin' && role !== 'admin') return forbidden('Role admin is required', res);
  next();
}