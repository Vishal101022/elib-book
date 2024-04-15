require("dotenv").config();
import app from "./src/app";

const startServer = () => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
