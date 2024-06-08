require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const express = require("express");
const app = express();

const { body, validationResult } = require("express-validator");

const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");
const availabilityRouter = require("./routes/availability");
const userRouter = require("./routes/users");
const familyRouter = require("./routes/family");
const sendEmailRouter = require("./routes/send");

const NotFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authenticationMiddleware } = require("./middleware/authentication");

//middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//morgan is a logger that logs the request in the console
app.use(morgan("dev"));
//cookie parser is used to parse the cookies in the request
app.use(cookieParser());

//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/availability", authenticationMiddleware, availabilityRouter);
app.use("/api/v1/users", authenticationMiddleware, userRouter);
app.use("/api/v1/family", authenticationMiddleware, familyRouter);
app.use("/api/v1/send", sendEmailRouter);

app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

//public
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 5005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
