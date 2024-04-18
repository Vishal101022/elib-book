import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "../user/userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
require("dotenv").config();

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "name, email and password are required");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "user already exists");
      return next(error);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    
    res.status(201).json({ accessToken: token });
  } catch (error:any) {
    return next(
      createHttpError(500, "Failed to create user: " + error.message)
    );
  }
};

export { createUser };
