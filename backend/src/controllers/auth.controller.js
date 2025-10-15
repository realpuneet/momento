const { generateToken } = require("../config/token");
const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service");

const registerController = async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;

    const isUserExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserExists) {
      return res
        .status(400)
        .json({ message: "Email or Username Already Exists" });
    }

    const newUser = await userModel.create({
      fullName,
      email,
      password,
      username,
    });

    // Cache user data for 1 hour
    await cacheClient.setex(`user:${newUser._id}`, 3600, JSON.stringify(newUser));

    const token = await generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    const userResponse = {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
    };

    return res
      .status(201)
      .json({ message: "User Registered Success", user: userResponse });
  } catch (error) {
    console.log("Registration Error :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword)
      return res.status(401).json({ message: "Invalid Credentials" });

    // Cache user data for 1 hour
    await cacheClient.setex(`user:${user._id}`, 3600, JSON.stringify(user));

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    //for password not send to the frontend
    const { password: _, ...userData } = user._doc;

    return res.status(200).json({ message: "User Logged In ", user: userData });
  } catch (error) {
    console.log("Login Error :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if(!token) {
      return res.status(400).json({ message: 'token not found' });   
    }

    await cacheClient.set(token, "blacklisted");

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict"
    });

    return res.status(200).json({ message: 'Logged Out Success' });

  } catch (error) {
    console.log("Error in sign out :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
