const jwt = require("jsonwebtoken");

const generateToken = (user_id) => {
  try {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
      expiresIn: "10y",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Token generation failed");
  }
};

const verifyToken = (token) => {
  try {
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    return tokenVerify;
  } catch (error) {
    console.log("Error in verify token", error);
    throw new Error("Token verification failed");
  }
};

module.exports = { generateToken, verifyToken };
