"use client";

import { forwardRef } from "react";

const primaryClasses =
  "h-10 box-border py-2 px-4 rounded-lg bg-[#FFAD49] text-[#0F1117] font-semibold hover:bg-[#ffb85c] focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:ring-offset-2 focus:ring-offset-[#0F1117] leading-none inline-flex items-center justify-center";

const ghostClasses =
  "h-10 box-border py-2 px-4 rounded-lg text-sm text-white/70 hover:text-white underline focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:ring-offset-2 focus:ring-offset-[#0F1117] leading-none inline-flex items-center justify-center";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={
        variant === "ghost" ? `${ghostClasses} ${className}` : `${primaryClasses} ${className}`
      }
      {...props}
    />
  )
);
Button.displayName = "Button";
