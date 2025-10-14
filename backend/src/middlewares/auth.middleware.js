const { verifyToken } = require("../config/token");
const userModel = require("../models/user.model");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = await verifyToken(token);

    const user = await userModel.findById(decoded.id);

     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in authUser", error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authUser;
