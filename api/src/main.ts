import express from "express";
import type { Response, Request, NextFunction } from "express";
import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import errorHandler from "./middleware/errorHandler";

import UserController from "./controllers/user.controller";
import PromptController from "./controllers/prompt.controller";
import AuthController from "./controllers/auth.controller";

/**
 * The main app class
 *
 * @class Main
 */
export class Main {
  public app: express.Application;

  /**
   * Initializes the express app, configures middleware
   * and controllers
   *
   * @class Main
   * @constructor
   */
  constructor() {
    // create express application
    this.app = express();

    // configure application middleware
    this.configMiddleware();

    // add controllers
    this.configControllers();

    // add further error handling middleware
    this.configErrorHandling();
  }

  /**
   * Configures necessary middleware
   *
   * @class App
   * @method configMiddleware
   * @returns void
   */
  public configMiddleware(): void {
    // configure logger
    this.app.use(logger("dev"));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // add cors support
    this.app.use(cors());

    // add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    // configure view engine
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "jade");

    // add cookie parsing middleware
    this.app.use(cookieParser());
  }

  /**
   * Sets up app controllers and routing associations
   *
   * @class App
   * @method configControllers
   * @return void
   */
  private configControllers(): void {
    this.app.use("/users", new UserController().router);
    this.app.use("/prompt", new PromptController().router);
    this.app.use("/auth", new AuthController().router);
  }

  /**
   * Configures error handling middleware.
   *
   * @class App
   * @method configErrorHandling
   * @return void
   */
  public configErrorHandling(): void {
    // catch 404 and forward to error handler
    this.app.use(function (
      _req: Request,
      _res: Response,
      next: NextFunction
    ): void {
      // catch 404 and forward to error handler
      next(createError(404));
    });

    // error handler
    this.app.use(errorHandler);
  }
}
