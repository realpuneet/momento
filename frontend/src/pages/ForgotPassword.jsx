import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const [step, setStep] = useState(1);


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-200 to-blue-100 px-4 py-8">
      {step ==1 && <div className="bg-[#F8F8F4] rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 drop-shadow">Forgot Password?</h2>
        <p className="text-center text-gray-600 text-xs sm:text-sm mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <div className="space-y-4 sm:space-y-5">
          <input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="w-full px-4 sm:px-5 py-3 rounded-full bg-white shadow focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
          />
          
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-400 to-blue-400 shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Send Reset Link
          </button>
        </div>

        <div className="text-center mt-6 text-sm">
          Remember your password? <Link to="/login" className="text-blue-500 underline hover:text-blue-600 transition-colors">Sign in</Link>
        </div>
      </div>}
    </div>
  );
};

export default ForgotPassword;