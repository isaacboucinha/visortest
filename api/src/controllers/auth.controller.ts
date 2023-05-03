import { Router } from "express";
import type { Request, Response } from "express";

import * as AuthService from "../services/auth.service";

import type { IUser } from "../types/user.type";

/**
 * Controller for auth-related requests
 */
export default class AuthController {
  public router: Router;

  /**
   *
   * @class AuthController
   * @constructor
   */
  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize(): void {
    this.router.post("/", this.login);
    this.router.get("/refresh", this.refreshToken);
    this.router.post("/logout", this.logout);
  }

  private login(req: Request, res: Response): void {
    const userData: IUser = req.body;
    AuthService.loginUser(userData)
      .then((authInfo) => {
        if (authInfo === null) {
          res.status(401).json({ message: "Unauthorized" });
        } else {
          res.cookie("jwt", authInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: false
          });

          res.send({ authInfo });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }

  private refreshToken(req: Request, res: Response): void {
    const cookies = req.cookies;

    if (cookies?.jwt === undefined) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    AuthService.refreshToken(cookies.jwt)
      .then((authInfo) => {
        if (authInfo === null) {
          res.status(401).json({ message: "Unauthorized" });
        } else {
          res.send({ accessToken: authInfo.accessToken });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }

  private logout(req: Request, res: Response): void {
    const cookies = req.cookies;

    if (cookies?.jwt === undefined) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: false
      });
      res.status(200).json({ message: "User logged out" });
    }
  }
}
