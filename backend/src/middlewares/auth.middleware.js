const { verifyToken } = require("../config/token");
const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await cacheClient.get(token);
    if (isBlacklisted === "blacklisted") {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = await verifyToken(token);

    // Check cache for user data
    let user = await cacheClient.get(`user:${decoded.id}`);
    if (user) {
      user = JSON.parse(user);
    } else {
      user = await userModel.findById(decoded.id);
      if (user) {
        // Cache user data for 1 hour
        await cacheClient.setex(`user:${decoded.id}`, 3600, JSON.stringify(user));
      }
    }

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
