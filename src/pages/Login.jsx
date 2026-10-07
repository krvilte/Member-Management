import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LogIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) throw error;
      navigate("/app/dashboard");
    } catch (err) {
      setErrorMessage(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Header */}
      <header className="w-full px-12 py-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-900 text-white font-bold flex items-center justify-center rounded text-sm tracking-tighter select-none">
            a
          </div>
          <span className="font-semibold text-lg tracking-tight select-none">
            aveondesk
          </span>
        </Link>

        <div className="text-sm text-neutral-600">
          <Link
            to="/signup"
            className="font-medium text-neutral-900 hover:underline inline-flex items-center gap-1"
          >
            Sign up <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Split Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1440px] mx-auto px-6 lg:px-12 items-center">
        {/* Left Column: Brand & Value Prop (Consistent with Onboarding) */}
        <div className="lg:pr-20 py-12 lg:py-0 border-b lg:border-b-0 lg:border-r border-neutral-200">
          <div className="max-w-[460px]">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-900 block mb-6">
              MEMBERSHIPS, SIMPLIFIED.
            </span>
            <h1 className="text-4xl lg:text-[52px] font-normal leading-[1.08] tracking-tight text-neutral-900 mb-6">
              Welcome back to your community.
            </h1>
            <p className="text-neutral-600 text-[15px] leading-relaxed mb-10">
              Manage your members, track your plan renewals, and keep your
              organization moving forward effortlessly.
            </p>
          </div>
        </div>

        {/* Right Column: Sign In Form */}
        <div className="lg:pl-24 py-12 lg:py-0 w-full max-w-[560px]">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900">
              Log in
            </h2>
            <p className="text-sm text-neutral-500 mt-1.5">
              Enter your credentials to access your organization dashboard.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@northline.club"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-all text-neutral-900 placeholder:text-neutral-400"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-neutral-700">
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-all text-neutral-900 pr-10 placeholder:text-neutral-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{loading ? "Logging in..." : "Log in"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="text-sm text-neutral-600 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-neutral-900 hover:underline inline-flex items-center gap-1"
              >
                Sign up <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-12 py-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
        <div>© 2026 AveonDesk</div>
        <div className="flex items-center gap-6 mt-3 sm:mt-0">
          <a
            href="#privacy"
            className="hover:text-neutral-900 transition-colors"
          >
            Privacy policy
          </a>
          <a href="#terms" className="hover:text-neutral-900 transition-colors">
            Terms of service
          </a>
          <a
            href="#support"
            className="hover:text-neutral-900 transition-colors inline-flex items-center gap-1"
          >
            Contact support ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
