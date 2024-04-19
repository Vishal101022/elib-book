import express from "express";
import globalError from "./middlewares/globalError";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "welcome to elib" });
})
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use(globalError);
export default app;
