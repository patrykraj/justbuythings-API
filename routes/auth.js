require("dotenv").config();

const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  registerValidation,
  loginValidation,
} = require("../validators/validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, lastname, email, password, repeatPassword } = req.body;

  if (password !== repeatPassword)
    return res.status(400).send("Passwords must be the same");

  const emailExists = await User.findOne({ email: email });
  if (emailExists) return res.status(400).send("Email already exists.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        transactions: user.transactions,
      },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Email does not exist.");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const token = jwt.sign(
    {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      transactions: user.transactions,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
