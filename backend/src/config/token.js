const jwt = require("jsonwebtoken");

const generateToken = async (user_id) => {
  try {
    const token = await jwt.sign({ user_id }, process.env.JWT_SECRET, {
      expiresIn: "10y",
    });
    return token;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Generate token Error" });
  }
};


module.exports = {generateToken};
