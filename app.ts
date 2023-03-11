import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./databases/data";
import useRouter from "./routes/user";
import domesticRouter from "./routes/domestic";
import cartRouter from "./routes/cart";
import { checkJwtToken } from "./middlewares/checkJwtToken";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { notFoundRoute } from "./middlewares/notFoundRoute";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(express.json());
app.use("/user", useRouter);
app.use("/domestic", checkJwtToken, domesticRouter);
app.use("/cart", checkJwtToken, cartRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
