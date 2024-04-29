import mongoose from "mongoose";

interface Book {
  title: string;
  author: mongoose.Types.ObjectId;
  publication_year: number;
  genre: string;
  description: string;
}

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publication_year: { type: Number, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Book>("Book", bookSchema);
