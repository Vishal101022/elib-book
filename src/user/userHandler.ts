import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "../user/userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
require("dotenv").config();

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
  } catch (error: any) {
    return next(
      createHttpError(500, "Failed to create user: " + error.message)
    );
  }
};

// login user with ther email and password
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const error = createHttpError(400, "User not found");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = createHttpError(401, "Invalid credentials");
      return next(error);
    }
    // Generate JWT token
    const token = sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.status(201).json({ accessToken: token });
  } catch (error: any) {
    return next(createHttpError(500, "Failed to login user: " + error.message));
  }
};
export { createUser, loginUser };
