import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, clearError } from "../../features/auth/authSlice";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CompanyLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());

      const response = await api.post("/auth/login", data);
      const { token, user } = response.data;

      if (!user) {
        throw new Error("User data not found in response");
      }

      localStorage.setItem("token", token);
      dispatch(loginSuccess({ user, token }));

      toast.success("Login successful!");
      
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please check your credentials.";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Outer card */}
      <div className="bg-white shadow-2xl rounded-3xl flex max-w-5xl w-full overflow-hidden">

        {/* Left gradient / image */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600
                        items-center justify-center min-h-[600px]">
          <img
            src="/login-illustration.jpeg"
            alt="Login Illustration"
            className="max-w-full max-h-full object-contain opacity-90"
          />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login as a Company</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email ID
              </label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-200"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
              <a href="#" className="text-blue-500 text-sm mt-2 inline-block hover:text-blue-600 transition-colors">
                Login with OTP
              </a>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Enter your password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-200"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              <a href="#" className="text-blue-500 text-sm mt-2 inline-block hover:text-blue-600 transition-colors">
                Forgot Password ?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white
                         font-bold rounded-full py-3 px-6 shadow-lg hover:shadow-xl
                         transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don’t have an account?{" "}
            <a href="/company-user/register" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
