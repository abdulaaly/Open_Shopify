import React from "react";
import { cn } from "../utils.js";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "info" | "success" | "warning" | "critical" | "magic";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  tone = "neutral",
  size = "md",
  dot = false,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border transition-colors select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] tracking-wide",
    md: "px-2.5 py-0.5 text-xs tracking-normal",
  };

  const toneStyles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    info: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    critical: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
    magic: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
  };

  const dotColors = {
    neutral: "bg-slate-500",
    info: "bg-sky-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-rose-500",
    magic: "bg-purple-500",
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], toneStyles[tone], className)} {...props}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", dotColors[tone])} />}
      {children}
    </span>
  );
};
