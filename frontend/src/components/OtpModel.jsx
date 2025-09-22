import { useEffect, useState } from "react";
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from "../api/firebase";

export default function OtpModal({ phoneNumber, email, onClose, onVerified }) {
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // send OTP when modal opens
  const sendOTP = async () => {
    setLoading(true);
    try {
      if (!auth) {
        console.warn("Firebase auth not initialized. Check firebase config.");
        return;
      }

      // Initialize reCAPTCHA once per open
      let recaptcha;
      if (window.recaptchaVerifier) {
        recaptcha = window.recaptchaVerifier;
      } else {
        recaptcha = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible", // change to 'normal' if you want the widget visible
          }
        );
        window.recaptchaVerifier = recaptcha;
      }

      // Ensure the widget is rendered
      if (typeof recaptcha.render === "function") {
        await recaptcha.render();
      }

      // Firebase expects E.164 format e.g. +15551234567
      const targetPhone = phoneNumber;
      const result = await signInWithPhoneNumber(auth, targetPhone, recaptcha);
      setConfirmationResult(result);
    } catch (err) {
      console.error(err);
      alert(
        err?.message ||
          "Failed to send OTP. Please ensure phone number is in +{country}{number} format."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) {
      alert("Please send OTP again.");
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      onVerified && onVerified();
    } catch (err) {
      console.error(err);
      alert("Invalid OTP. Please try again.");
    }
  };

  useEffect(() => {
    // Auto-send OTP when modal opens
    sendOTP();
    // Cleanup recaptcha when modal unmounts
    return () => {
      try {
        if (window.recaptchaVerifier && typeof window.recaptchaVerifier.clear === "function") {
          window.recaptchaVerifier.clear();
        }
        window.recaptchaVerifier = null;
      } catch (_) {}
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Great Almost done!</h2>
        <p className="text-sm mb-4">Please verify your mobile number.</p>

        <div className="p-3 bg-green-100 text-green-800 rounded mb-3">
          A verification link has been sent to your email ({email}).
        </div>

        <div className="p-3 bg-pink-100 text-pink-800 rounded mb-3">
          Enter the OTP sent to {phoneNumber}
        </div>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          placeholder="Enter Your OTP Here"
        />

        <div id="recaptcha-container"></div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Close
          </button>
          <button
            onClick={sendOTP}
            disabled={loading}
            className="px-4 py-2 rounded border border-blue-300 text-blue-700"
          >
            {loading ? "Sending..." : "Resend OTP"}
          </button>
          <button
            onClick={verifyOTP}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Verify Mobile
          </button>
        </div>
      </div>
    </div>
  );
}

