import React from "react";

export function ForgotPassword() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-20 bg-white">
        <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your email address below, and we’ll send you a link to reset your password.
        </p>
        
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@mail.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Reset Password Button */}
        <button className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800">
          Reset Password
        </button>

        {/* Back to Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a href="/signin" className="text-black font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
      </div>
    </div>
  );
}

export default ForgotPassword;
