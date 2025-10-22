import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../api/AuthApi";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await registerUser(data);
      
      if (result.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/"); // Redirect to home page after successful registration
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-200 to-blue-100 px-4 py-8">
      <img className="h-20 w-20 z-10 " src="/logo.png" alt="momento" />
      <div className="bg-[#F8F8F4] rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 drop-shadow">Sign Up</h2>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <input
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Full name"
            className="w-full px-4 sm:px-5 py-3 rounded-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            disabled={loading}
          />
          {errors.fullName && <p className="text-red-500 text-sm ml-4">{errors.fullName.message}</p>}
          
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            className="w-full px-4 sm:px-5 py-3 rounded-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            disabled={loading}
          />
          {errors.username && <p className="text-red-500 text-sm ml-4">{errors.username.message}</p>}
          
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="Email address"
            className="w-full px-4 sm:px-5 py-3 rounded-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm ml-4">{errors.email.message}</p>}
          <div className="relative">
            <input
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 sm:px-5 py-3 pr-12 rounded-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
            >
              {showPassword ? (
                // Eye slash icon (hide password)
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                // Eye icon (show password)
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          {errors.password && <p className="text-red-500 text-sm ml-4">{errors.password.message}</p>}
          
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white shadow transition-all duration-200 mt-6 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-400 to-blue-400 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </button>
        </form>
        <div className="text-center mt-5 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 underline hover:text-blue-600 transition-colors">Sign in</Link>
        </div>
        <div className="text-center mt-4 text-xs text-gray-600">or Continue with</div>
        <div className="flex gap-3 sm:gap-4 justify-center mt-4">
          <button className="flex items-center justify-center px-4 py-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 hover:scale-105 min-w-[120px] sm:min-w-[140px]">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center px-4 py-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 hover:scale-105 min-w-[120px] sm:min-w-[140px]">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
