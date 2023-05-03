import { Router } from "express";
import type { Request, Response } from "express";

import authenticator from "../middleware/authenticator";

import type { IUser } from "../types/user.type";
import * as UserService from "../services/user.service";

/**
 * Controller for user-related requests
 */
export default class UserController {
  public router: Router;

  /**
   *
   * @class UserController
   * @constructor
   */
  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize(): void {
    this.router.use(authenticator);
    this.router.get("/", this.getAllUsers);
    this.router.get("/:userId", this.getUser);
    this.router.post("/", this.createUser);
  }

  private getAllUsers(_req: Request, res: Response): void {
    UserService.getAllUsers()
      .then((users) => {
        if (users?.length === 0) {
          res.status(404).json({ message: "No users found" });
        } else {
          res.send(users);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  private getUser(req: Request, res: Response): void {
    UserService.getUser(req.params.userId)
      .then((user) => {
        if (user === null) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.send(user);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  private createUser(req: Request, res: Response): void {
    const userData: IUser = req.body;
    UserService.createUser(userData)
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => {
        // TODO err.message might send sensitive info
        res.status(500).send({ message: err.message });
      });
  }
}
