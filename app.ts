import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./databases/data";
import useRouter from "./routes/user";
import domesticRouter from "./routes/domestic";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import cartItemRouter from "./routes/cartItem";
import { checkJwtToken } from "./middlewares/checkJwtToken";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { notFoundRoute } from "./middlewares/notFoundRoute";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(express.json());

// Use morgan to log requests
app.use(morgan("combined"));

// gzip compression
app.use(compression());

// Use cors to enable Cross-Origin Resource Sharing
app.use(cors());

// Use helmet for security
app.use(helmet());

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
app.use("/order", checkJwtToken, orderRouter);
app.use("/cartItem", checkJwtToken, cartItemRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

app.listen(process.env.PORT, () => {
  console.log("the server is running on port 3000");
});
