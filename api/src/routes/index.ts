import { Router } from "express";

const indexRouter = Router();
export default indexRouter;

/* GET home page. */
indexRouter.get("/", function (_req, res, _next) {
  res.render("index", { title: "Express" });
});
