import axiosInstance from "../config/axiosInstance";

// Register API function
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
      error: error.response?.data || error.message,
    };
  }
};

// Login API function
export const loginUser = async (loginData) => {
  try {
    // Handle emailOrUsername field - split it into email and username
    const { emailOrUsername, password } = loginData;
    
    // Check if emailOrUsername contains @ to determine if it's email or username
    const isEmail = emailOrUsername.includes("@");
    
    const requestData = {
      password,
      ...(isEmail ? { email: emailOrUsername } : { username: emailOrUsername }),
    };

    const response = await axiosInstance.post("/auth/login", requestData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
      error: error.response?.data || error.message,
    };
  }
};

// Logout API function
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Logout failed",
      error: error.response?.data || error.message,
    };
  }
};