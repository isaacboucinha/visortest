import express from "express";
import type { Response, Request, NextFunction } from "express";
import path from "path";
import createError from "http-errors";
import type { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";

// app.use("/", indexRouter);

/**
 * The main app class
 *
 * @class Main
 */
export class Main {
  public app: express.Application;

  /**
   * Constructor.
   *
   * @class Main
   * @constructor
   */
  constructor() {
    // create express application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // configure api routes
    this.api_routes();
  }

  /**
   * Create REST API routes
   *
   * @class App
   * @method api
   */
  public api_routes(): void {
    // empty for now
  }

  /**
   * Configures application (adds all necessary middleware)
   *
   * @class App
   * @method config
   */
  public config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    // configure view engine
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "jade");

    // configure logger
    this.app.use(logger("dev"));

    // add cookie parsing middleware
    this.app.use(cookieParser());
  }

  /**
   * Associates routers to their correct route
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes(): void {
    this.app.use("/", indexRouter);

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
    this.app.use(function (
      err: HttpError,
      req: Request,
      res: Response,
      _next: NextFunction
    ): void {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status ?? 500);
      res.render("error");
    });
  }
}
