import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import userModel from "../user/userModel";
import { AuthRequest } from "../middlewares/authenticate";
import mongoose from "mongoose";

interface FilterQuery {
  author?: string;
  p_year?: number;
}

// create new book
// https://localhost:3000/api/books
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, publication_year, genre, description } = req.body;
  if (!title || !publication_year || !genre || !description) {
    const error = createHttpError(
      400,
      "title, publication_year, genre and description are required"
    );
    return next(error);
  }

  try {
    const _req = req as AuthRequest;
    const user = await userModel.findOne({ _id: _req.userId });

    const newBook = await bookModel.create({
      title,
      author: _req.userId,
      author_name: user?.name,
      publication_year,
      genre,
      description,
    });
    res.status(201).json(newBook);
  } catch (error: any) {
    return next(
      createHttpError(500, "Failed to create book: " + error.message)
    );
  }
};

// update book
// https://localhost:3000/api/books/:id
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookid = req.params.id;
  const { title, publication_year, genre, description } = req.body;
  try {
    const validObjectId = new mongoose.Types.ObjectId(bookid);
    console.log(validObjectId);
    const book = await bookModel.findById(validObjectId);

    if (!book) {
      const error = createHttpError(404, "Book not found");
      return next(error);
    }

    // Check if the user is the author of the book
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      const error = createHttpError(
        403,
        "You are not authorized to update this book"
      );
      return next(error);
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      validObjectId,
      {
        title,
        publication_year,
        genre,
        description,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedBook);
  } catch (error: any) {
    return next(
      createHttpError(500, "Failed to update book: " + error.message)
    );
  }
};
// fetch all books
// https://localhost:3000/api/books/allbooks

const allBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error: any) {
    return next(
      createHttpError(500, "Failed to fetch books: " + error.message)
    );
  }
};
// fetch specific book
// https://localhost:3000/api/books/book/:id
const oneBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookid = req.params.id;
  try {
    const validObjectId = new mongoose.Types.ObjectId(bookid);
    const book = await bookModel.findById(validObjectId);
    if (!book) {
      const error = createHttpError(404, "Book not found");
      return next(error);
    }
    res.status(200).json(book);
  } catch (error: any) {
    return next(createHttpError(500, "Failed to fetch book: " + error.message));
  }
};
// delete book through id
// https://localhost:3000/api/books/:id
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookid = req.params.id;
  try {
    const validObjectId = new mongoose.Types.ObjectId(bookid);
    const book = await bookModel.findById(validObjectId);
    if (!book) {
      const error = createHttpError(404, "Book not found");
      return next(error);
    }
    // Check if the user is the author of the book
    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      const error = createHttpError(
        403,
        "You are not authorized to delete this book"
      );
      return next(error);
    }
    await bookModel.findByIdAndDelete(validObjectId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error: any) {
    return next(
      createHttpError(500, "Failed to delete book: " + error.message)
    );
  }
};

// filter book by author or publication year
// https://localhost:3000/api/books/search/filter
const filterBook = async (req: Request, res: Response, next: NextFunction) => {
  const { author, publication_year } = req.body;
  console.log(author, publication_year);
  try {
    const books = await bookModel.find({
      $or: [
        { author_name: { $in: author } },
        { publication_year: { $in: publication_year } },
      ],
    });
    res.status(200).json(books);
  } catch (error: any) {
    return next(
      createHttpError(500, "Failed to filter books: " + error.message)
    );
  }
};
export { createBook, updateBook, allBooks, oneBook, deleteBook, filterBook };
