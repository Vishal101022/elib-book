import express from "express";
import { createBook, updateBook, allBooks, oneBook, deleteBook, filterBook } from "./bookHandler";
import authenticate from "../middlewares/authenticate";

const bookRouter = express.Router();

// create book route
bookRouter.post("/", authenticate, createBook);
// update book route
bookRouter.put("/:id", authenticate, updateBook);
// fetch specific book route
bookRouter.get("/:id", oneBook);
// delete book route
bookRouter.delete("/:id", authenticate, deleteBook);
// filter book route
bookRouter.get("/search/filter", filterBook);
// all book route
bookRouter.get("/allbook", allBooks);


export default bookRouter;
