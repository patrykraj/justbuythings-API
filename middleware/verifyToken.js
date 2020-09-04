const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["auth-token"];

  if (token == null) {
    console.log("NO TOKEN PROVIDED");
    return res.status(401).send("Access denied. No token provided");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("TOKEN EXPIRED");
      return res.status(403).send("Access denied. Token expired");
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send("Invalid token.");
    }
  });
}

module.exports.verifyToken = verifyToken;
