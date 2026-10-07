import React from "react";

export default function StepTwoFields({ formData, handleChange }) {
  return (
    <>
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Organization name</label>
        <input
          type="text"
          name="orgName"
          value={formData.orgName}
          onChange={handleChange}
          placeholder="Acme Corp"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 text-neutral-900"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Organization email</label>
        <input
          type="email"
          name="orgEmail"
          value={formData.orgEmail}
          onChange={handleChange}
          placeholder="support@acmecorp.com"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 text-neutral-900"
        />
      </div>
    </>
  );
}
