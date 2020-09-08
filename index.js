const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const ordersRoute = require("./routes/orders");

dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to db!"))
  .catch((err) => console.log("Could not connect to mongoDB", err));

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

//Middleware
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/user", userRoute);
app.use("/api/orders", ordersRoute);

//Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public"));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server up and running!"));
