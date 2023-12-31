import createError from "http-errors";

export const badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    status: error.status,
    message: error.message,
  });
};

export const internalServerError = (req, res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: 1,
    status: error.status,
    message: error.message,
  });
};

export const notFound = (req, res) => {
  const error = createError.NotFound("This route is not defined");
  return res.status(error.status).json({
    err: 1,
    status: error.status,
    message: error.message,
  });
};

export const unAuthorized = (err, res) => {
  const error = createError.Unauthorized(err);
  return res.status(error.status).json({
    err: 1,
    message: error.message,
  })
}

export const forbidden = (err, res) => {
  const error = createError.Forbidden(err);
  return res.status(error.status).json({
    err: 1,
    message: error.message,
  })
}