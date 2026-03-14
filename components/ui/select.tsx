"use client";

import { forwardRef } from "react";

const selectClasses =
  "h-10 box-border py-2 px-4 rounded-lg bg-[#161921] text-white border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAD49] min-w-0 leading-none";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => (
    <select
      ref={ref}
      className={`${selectClasses} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
