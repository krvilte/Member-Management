import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AFTER_LOGIN_PATH = "/app/dashboard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ email, password }) {
  const errors = {};

  if (!EMAIL_RE.test(email.trim())) {
    errors.email = "Enter a valid email, like jamie@northline.club.";
  }

  if (!password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  // Redirect back to the protected route after login.
  const redirectTo = location.state?.from?.pathname || AFTER_LOGIN_PATH;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const errors = validate(formData);
  const showError = (field) => touched[field] && errors[field];

  const inputClass = (field) =>
    showError(field) ? "border-destructive focus-visible:ring-destructive" : "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const { error } = await signIn(formData.email.trim(), formData.password);

      if (error) throw error;

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/30 px-4 py-16 font-sans text-foreground sm:py-24">
      <Link to="/" className="text-2xl font-normal tracking-tight">
        Aveondesk
      </Link>

      <div className="mt-12 w-full max-w-[400px]">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Pick up where you left off.
        </p>

        {errorMessage && (
          <Alert variant="destructive" className="mt-5">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">Work email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="jamie@northline.club"
              aria-invalid={!!showError("email")}
              className={`mt-2 ${inputClass("email")}`}
            />

            {showError("email") && (
              <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              {/* Replace with your password-reset route when available. */}
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative mt-2">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                aria-invalid={!!showError("password")}
                className={`pr-10 ${inputClass("password")}`}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>

            {showError("password") && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="mt-6 w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <p className="mt-6 text-center text-sm">
            New to Aveondesk? {" "}
            <Link to="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
