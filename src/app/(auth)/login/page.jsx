"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Visibility state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
     window.location.href = "/";
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">Welcome Back</h2>

          {error && (
            <div className="alert alert-error text-sm py-2 shadow-sm rounded-lg text-white">
              <span>{error}</span>
            </div>
          )}

       
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold">Email Address</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full focus:input-primary"
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </div>

          <p className="text-center text-sm mt-2">
            New here?{" "}
            <Link href="/register" className="link link-secondary font-bold no-underline hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}