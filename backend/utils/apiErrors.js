import AppError from './appError.js'

// 1). If there is any controller error.
export const badRequestError = (res, err, next) => {
    if (err.name === "CastError" && err.kind === "ObjectId") {
      return next(new AppError(400, "Invalid ID provided"));
    }
    res.status(400).json({ status: "error", err });
  };
  