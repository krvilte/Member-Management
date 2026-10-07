import React, { useState, useCallback } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BenefitItem from "../components/BenefitLayout";
import StepOneFields from "../components/StepOneField";
import StepTwoFields from "../components/StepTwoField";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: true,
    orgName: "",
    orgEmail: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleStepOneSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      if (error) throw error;
      setStep(2);
    } catch (error) {
      setErrorMessage(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleStepTwoSubmit = async (e) => {
    e.preventDefault();
    if (!formData.orgName || !formData.orgEmail) {
      navigate("/app/dashboard");
      return;
    }

    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between font-sans selection:bg-neutral-900 selection:text-white">
      <header className="w-full px-6 lg:px-12 py-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-900 text-white font-bold flex items-center justify-center rounded text-sm tracking-tighter select-none">
            a
          </div>
          <span className="font-semibold text-lg tracking-tight select-none">
            aveondesk
          </span>
        </Link>
        {step === 1 && (
          <div className="text-sm text-neutral-600">
            <Link
              to="/login"
              className="font-medium text-neutral-900 hover:underline inline-flex items-center gap-1"
            >
              Log in <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1440px] mx-auto px-6 lg:px-12 items-center">
        <div className="lg:pr-20 py-12 lg:py-0 border-b lg:border-b-0 lg:border-r border-neutral-200">
          <div className="max-w-[460px]">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-900 block mb-6">
              MEMBERSHIPS, SIMPLIFIED.
            </span>
            <h1 className="text-4xl lg:text-[52px] font-normal leading-[1.08] tracking-tight text-neutral-900 mb-6">
              {step === 1 ? (
                <>
                  A little less admin.
                  <br />A lot more belonging.
                </>
              ) : (
                <>
                  Give your community
                  <br />a place to grow.
                </>
              )}
            </h1>
            <p className="text-neutral-600 text-[15px] leading-relaxed mb-10">
              {step === 1
                ? "A simpler way to manage your members, build your plans, and keep your community moving."
                : "One workspace for your people, plans, and payments. Let’s make it yours."}
            </p>
            <ul className="space-y-4 text-sm text-neutral-800">
              <BenefitItem text="Every member, in one place" />
              <BenefitItem text="Flexible plans. Clear collections." />
              <BenefitItem text="Less admin. More community." />
            </ul>
          </div>
        </div>

        <div className="lg:pl-24 py-12 lg:py-0 w-full max-w-[560px]">
          <div className="mb-8">
            <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block mb-2">
              STEP 0{step} / 02
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900">
              {step === 1 ? "Create your account" : "Set up your organization"}
            </h2>
            <p className="text-sm text-neutral-500 mt-1.5">
              {step === 1
                ? "Your community's next chapter starts here."
                : "A few details now. You can skip this and update later."}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={step === 1 ? handleStepOneSubmit : handleStepTwoSubmit}
            className="space-y-5"
          >
            {step === 1 ? (
              <StepOneFields
                formData={formData}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ) : (
              <StepTwoFields formData={formData} handleChange={handleChange} />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{step === 1 ? "Continue" : "Finish Setup"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => navigate("/app/dashboard")}
                className="w-full text-center text-xs text-neutral-500 hover:text-neutral-900 pt-1 cursor-pointer"
              >
                Skip for now and go to dashboard
              </button>
            )}

            {step === 1 && (
              <div className="text-sm text-neutral-600 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-neutral-900 hover:underline inline-flex items-center gap-1"
                >
                  Log in <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>

      <footer className="w-full px-6 lg:px-12 py-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
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
