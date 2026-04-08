const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");

const isAuthentication = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader || typeof bearerHeader !== "string") {
      return res.status(401).send("Authentication not valid");
    }
    const tokenParts = bearerHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).send("Authentication not valid");
    }
    const accessToken = tokenParts[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    req.userId = decodeJwt._id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token expired");
    }
    return res.status(401).send("Authentication not valid");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).send("Authentication not valid");
    }
    if (user.role === "admin") {
      return next();
    }
    return res.status(403).send("Admin access required");
  } catch (error) {
    return res.status(401).send("Authentication not valid");
  }
};

module.exports = {
  isAuthentication: isAuthentication,
  isAdmin: isAdmin,
};
