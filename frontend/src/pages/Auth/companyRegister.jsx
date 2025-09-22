import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useState } from "react";
import OtpModal from "../../components/OtpModel.jsx";

export default function CompanyRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [submitError, setSubmitError] = useState("");

  const toE164 = (raw) => {
    if (!raw) return "";
    const digits = String(raw).replace(/[^0-9+]/g, "");
    if (digits.startsWith("+")) return digits;
    // Default to +91 if no country code provided
    return "+91" + digits;
  };

  const onSubmit = async (data) => {
    console.log("Form submitted with:", data);
    try {
      setIsLoading(true);
      setSubmitError("");

      const genderMap = { male: "M", female: "F", other: "O" };

      const backendData = {
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        gender: genderMap[data.gender] || data.gender,
        mobile_no: toE164(data.mobile),
        signup_type: "e"
      };

      const res = await api.post("/auth/register", backendData);
      if (res?.status >= 200 && res?.status < 300) {
        try { toast.success(res.data?.message || "Registration successful! Please verify OTP."); } catch (_) {}
      }

      // Prepare and show OTP modal (Firebase Phone Auth will send OTP)
      setOtpEmail(data.email);
      setOtpPhone(toE164(data.mobile));
      setShowOtpModal(true);
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed.";
      setSubmitError(errorMessage);
      try { toast.error(errorMessage); } catch (_) {}
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-[#f8faff]">
      <div className="flex w-[90%] max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left Gradient Section */}
        <div className="hidden md:flex flex-1 bg-gradient-to-b from-pink-200 via-purple-300 to-purple-600 items-center justify-center">
          <img
            src="/login-illustration.jpeg"
            alt="Registration Illustration"
            className="max-w-full max-h-full object-contain opacity-90"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Register as a Company
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter Your Full Name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block mb-1 font-medium">Mobile No</label>
              <input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
              )}
            </div>

            {/* Organization Email */}
            <div>
              <label className="block mb-1 font-medium">Organization Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Official Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <div className="flex space-x-4">
                {["male", "female", "other"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center space-x-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={g}
                      {...register("gender", { required: "Please select gender" })}
                      className="accent-purple-500"
                    />
                    <span className="capitalize">{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            {/* Password and Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start text-xs text-gray-500">
              <input
                type="checkbox"
                {...register("terms", { required: "You must agree to continue" })}
                className="mr-2 mt-1 accent-purple-500"
              />
              <span>
                By signing up, you agree to our{" "}
                <a href="#" className="text-purple-600 underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 underline">
                  Terms of Use
                </a>.
              </span>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white p-3 rounded-full font-medium shadow hover:opacity-90 transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            {submitError && (
              <p className="text-center text-sm text-red-600">{submitError}</p>
            )}

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    {showOtpModal && (
      <OtpModal
        phoneNumber={otpPhone}
        email={otpEmail}
        onClose={() => setShowOtpModal(false)}
        onVerified={() => {
          setShowOtpModal(false);
          toast.success("Mobile verified successfully. You can now login.");
          navigate("/login");
        }}
      />
    )}
    </>
  );
}
