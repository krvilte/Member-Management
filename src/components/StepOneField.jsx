import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function StepOneFields({ formData, handleChange, showPassword, setShowPassword }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1.5">First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Alex"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 text-neutral-900"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1.5">Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Smith"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 text-neutral-900"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="alex@northline.com"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 text-neutral-900"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 text-neutral-900 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-[11px] text-neutral-400 mt-1.5">At least 8 characters, including a number.</p>
      </div>
      <div className="flex items-center gap-2.5 pt-1">
        <input
          type="checkbox"
          id="terms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
          required
        />
        <label htmlFor="terms" className="text-xs text-neutral-600 cursor-pointer">
          I agree to the Terms of service and Privacy policy.
        </label>
      </div>
    </>
  );
}
