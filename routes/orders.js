const router = require("express").Router();
const User = require("../model/User");

router.get("/", async (req, res) => {
  let user = await User.findOne({ email: req.email });
  transactions = user.transactions;
  res.send(transactions);
});

router.post("/buy", async (req, res) => {
  let update = await User.updateOne(
    { email: req.body.email },
    { $push: { transactions: req.body.products } }
  );
  let user = await User.findOne({ email: req.body.email });
  res.send(user);
});

module.exports = router;
