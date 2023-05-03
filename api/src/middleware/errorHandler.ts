import type { Response, Request, NextFunction } from "express";
import type { HttpError } from "http-errors";

import Debug from "debug";

const debug = Debug("app:middleware:error");

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  debug(
    `An error occurred in request ${req.method} ${req.path}\nError ${err.message}`
  );
  const status = isNaN(err.statusCode) ? 500 : err.statusCode;
  res.status(status);
  res.json({ message: err.message });
};

export default errorHandler;
