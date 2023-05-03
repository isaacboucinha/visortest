import { Router } from "express";
import type { Request, Response } from "express";

import authenticator from "../middleware/authenticator";

import * as PromptService from "../services/prompt.service";

import type { IPrompt } from "../types/prompt.type";

/**
 * Controller for prompt-related requests
 */
export default class PromptController {
  public router: Router;

  /**
   *
   * @class PromptController
   * @constructor
   */
  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize(): void {
    this.router.use(authenticator);
    this.router.post("/", this.getAnswerForPrompt);
  }

  private getAnswerForPrompt(req: Request, res: Response): void {
    const prompt: IPrompt = req.body;
    const user = req.body.user;

    PromptService.getResponseForPrompt(user, prompt)
      .then((responsePrompt) => {
        res.send(responsePrompt);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}
