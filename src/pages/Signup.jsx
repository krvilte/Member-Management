
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const AFTER_SIGNUP_PATH = "/app/dashboard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ fullName, email, password, agreeTerms }) {
  const errors = {};

  if (fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!EMAIL_RE.test(email.trim())) {
    errors.email = "Enter a valid email, like jamie@northline.club.";
  }

  if (password.length < 8 || !/\d/.test(password)) {
    errors.password =
      "Use at least 8 characters, including a number.";
  }

  if (!agreeTerms) {
    errors.agreeTerms =
      "Please agree to the Terms of Service and Privacy Policy.";
  }

  return errors;
}

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: true,
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const errors = validate(formData);
  const showError = (field) => touched[field] && errors[field];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      fullName: true,
      email: true,
      password: true,
      agreeTerms: true,
    });

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const fullName = formData.fullName.trim();
      const [firstName, ...rest] = fullName.split(/\s+/);

      const { error } = await signUp(
        formData.email.trim(),
        formData.password,
        {
          full_name: fullName,
          first_name: firstName,
          last_name: rest.join(" "),
        }
      );

      if (error) throw error;

      navigate(AFTER_SIGNUP_PATH);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    showError(field)
      ? "border-destructive focus-visible:ring-destructive"
      : "";

  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/30 px-4 py-16 font-sans text-foreground sm:py-24">
      <Link
        to="/"
        className="text-2xl font-normal tracking-tight"
      >
        Aveondesk
      </Link>

      <div className="mt-12 w-full max-w-[400px]">
        <h1 className="text-3xl font-semibold tracking-tight">
          Sign up
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          A simpler way to run your membership.
        </p>

        {errorMessage && (
          <Alert variant="destructive" className="mt-5">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          {/* Full name */}
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jamie Lee"
              aria-invalid={!!showError("fullName")}
              className={`mt-2 ${inputClass("fullName")}`}
            />
            {showError("fullName") && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Work email */}
          <div className="mt-6">
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
              <p className="mt-1.5 text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-6">
            <Label htmlFor="password">Password</Label>

            <div className="relative mt-2">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>

            <p
              className={`mt-1.5 text-xs ${
                showError("password")
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {showError("password")
                ? errors.password
                : "Use at least 8 characters, including a number."}
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-6 w-full"
          >
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {loading ? "Creating account…" : "Create account"}
          </Button>

          <p className="mt-5 text-center text-sm">
            Already have an account? {" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
            >
               Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
