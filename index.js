const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes
const authRoute = require("./routes/auth");

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

app.get("/", (req, res) => {
  res.json({ message: "Welcome application." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server up and running!"));
