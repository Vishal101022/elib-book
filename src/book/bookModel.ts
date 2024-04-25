import mongoose from "mongoose";
interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  image: string;
  url: string;
}

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Book>("Book", bookSchema)