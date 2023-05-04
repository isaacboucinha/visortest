import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";

// import Debug from "debug";

import { accessTokenSecret } from "../services/auth.service";
import { getUserByEmail } from "../services/user.service";
import createHttpError from "http-errors";

// const debug = Debug("app:middleware:authenticator");

const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const cookies = req.cookies;

  if (cookies?.jwt === undefined) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token: string = cookies?.jwt;
  jwt.verify(token, accessTokenSecret, (error, payload) => {
    if (error !== null) {
      res.status(403).send({ message: "Unauthorized" });
    } else {
      // user is authenticated
      if (typeof payload !== "string" && payload?.user?.email !== undefined) {
        getUserByEmail(payload?.user?.email)
          .then((user) => {
            req.body.user = user;
            next();
          })
          .catch((err) => {
            createHttpError(err);
          });
      }
    }
  });
};

export default errorHandler;
