const router = require("express").Router();
const User = require("../model/User");

//Validation
const Joi = require("@hapi/joi");

const schema = {
  name: Joi.string().min(6).required(),
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
