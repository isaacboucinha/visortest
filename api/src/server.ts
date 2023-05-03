#!/usr/bin/env node

/**
 * Module dependencies.
 */
import { Main } from "./main";
import Debug from "debug";
import http from "http";
import mongoose from "mongoose";

const debug = Debug("app:server");

/**
 * Get port from environment and store in Express.
 */
const app = new Main().app;

if (process.env.API_PORT != null) {
  debug(`Read port ${process.env.API_PORT} from .env file`);
}

const port = normalizePort(process.env.API_PORT ?? "5432");
debug(`Will try to connect to port ${port.toString()}...`);
app.set("port", port);
/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): string | boolean | number {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Connect to mongoDB
 */
const connectToMongoDb = async (): Promise<void> => {
  if (process.env.MONGODB_URI !== undefined) {
    debug(`Read MongoDB URI from .env file: ${process.env.MONGODB_URI}`);
    await mongoose.connect(process.env.MONGODB_URI);
  } else {
    debug("No valid MongoDB URI provided, exiting...");
    process.exit(1);
  }
};

connectToMongoDb()
  .then(() => {
    debug("MongoDb Connected");
  })
  .catch((err) => {
    debug(err);
  });

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof port === "string"
      ? "Pipe " + port
      : typeof port === "number"
      ? `Port ${port}`
      : "Unspecified Port";

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      debug(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      debug(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  if (addr !== null) {
    const bind =
      typeof addr === "string" ? "pipe " + addr : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
