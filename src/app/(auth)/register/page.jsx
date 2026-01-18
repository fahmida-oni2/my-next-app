"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordRegex.test(formData.password)) {
      setError("Password must be 8+ characters with a letter, number, and symbol.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/login");
      } else {
        setError("Signup failed. Please check your details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSignup} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">Create Account</h2>

        
          {error && (
            <div className="bg-error/10 border border-error text-error text-xs p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:input-primary"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full focus:input-primary"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

   
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full focus:input-primary pr-12"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-secondary text-white w-full"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Register"}
            </button>
          </div>

          <p className="text-center text-sm mt-2">
            Already a member?{" "}
            <Link href="/login" className="link link-secondary font-bold no-underline hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}