const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const ordersRoute = require("./routes/orders");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to db!"))
  .catch((err) => console.log("Could not connect to mongoDB", err));

const corsOptions = {
  origin: "*",
  methods: "GET,PATCH,POST,DELETE",
  credentials: true,
  headers:
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api/user", authRoute);
app.use("/api/user", userRoute);
app.use("/api/orders", ordersRoute);
app.use("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server up and running!"));
