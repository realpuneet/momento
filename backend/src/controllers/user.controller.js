const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service");

const getCurrentUser = async (req, res) => {
  try {
    const user_Id = req.user._id;

    // Check cache first
    let user = await cacheClient.get(`user:${user_Id}`);
    if (user) {
      user = JSON.parse(user);
    } else {
      user = await userModel.findById(user_Id);
      if (user) {
        // Cache user data for 1 hour
        await cacheClient.setex(`user:${user_Id}`, 3600, JSON.stringify(user));
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Success", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getCurrentUser };
