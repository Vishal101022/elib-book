import express from "express";
import { createBook } from "./bookHandler";

const bookRouter = express.Router();

// routes 
bookRouter.post("/create", createBook);

export default bookRouter