const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Connect to DB
mongoose.connect(
  "mongodb+srv://patrykraj:owen1@cluster0.67pqm.mongodb.net/shop-template?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db!")
);

//Import Routes
const authRoute = require("./routes/auth");

//Route Middlewares
app.use("/api/user", authRoute);

app.listen(4000, () => console.log("server up and running!"));
