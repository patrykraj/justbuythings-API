const router = require("express").Router();
const User = require("../model/User");

const { verifyToken } = require("../middleware/verifyToken");

router.get("/getuser", verifyToken, async (req, res) => {
  let user = await User.findOne({ email: req.user.email });
  user = {
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    transactions: user.transactions,
  };
  res.send(user);
});

module.exports = router;
