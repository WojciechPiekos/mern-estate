require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const PORT = 3000;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrLog.log"
  );
});
