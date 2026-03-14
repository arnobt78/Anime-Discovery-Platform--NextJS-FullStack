"use client";

import { forwardRef } from "react";

const inputClasses =
  "w-full h-10 box-border py-2 px-4 rounded-lg bg-[#161921] text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:border-transparent leading-none";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`${inputClasses} ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
