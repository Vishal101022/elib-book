require("dotenv").config();
import app from "./src/app";
import  connectDB  from "./lib/db";

const startServer = async () => {
    // database connection
    await connectDB();
    const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
