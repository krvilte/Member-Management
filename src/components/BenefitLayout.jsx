import React from "react";
import { Check } from "lucide-react";

export default function BenefitItem({ text }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
      {text}
    </li>
  );
}
