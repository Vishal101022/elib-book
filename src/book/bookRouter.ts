import express from "express";
import { createBook } from "./bookHandler";
import multer from "multer";
import path from "path";

const bookRouter = express.Router();
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: {
    fileSize: 10 * 1024 * 1024, // 100mb
  },
});
// routes
bookRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "url", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
