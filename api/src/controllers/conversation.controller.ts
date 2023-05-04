import { Router } from "express";
import type { Request, Response } from "express";

import authenticator from "../middleware/authenticator";

import type { IUser } from "../types/user.type";
import * as ConversationService from "../services/conversation.service";

/**
 * Controller for conversation-related requests
 */
export default class ConversationController {
  public router: Router;

  /**
   *
   * @class ConversationController
   * @constructor
   */
  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize(): void {
    // TODO change authenticator middleware registration to main class
    // doing it like this might authenticate endpoints that are supposed to be public
    this.router.use(authenticator);

    this.router.get("/", this.getAllUserConversations);
  }

  private getAllUserConversations(req: Request, res: Response): void {
    const user: IUser = req.body.user;

    ConversationService.getUserConversations(user)
      .then((conversations) => {
        if (conversations?.length === 0) {
          res.status(404).json({ message: "No conversations found" });
        } else {
          res.send(conversations);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
}
