import mongoose from "mongoose";

interface User {
    name: string;
    email: string;
    password: string;
}

const { Schema } = mongoose;

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
