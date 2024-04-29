import express from "express";
import globalError from "./middlewares/globalError";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "welcome to elib" });
})
// http://localhost:3000/api/users
app.use("/api/users", userRouter);
// http://localhost:3000/api/books
app.use("/api/books", bookRouter);
app.use(globalError);
export default app;
