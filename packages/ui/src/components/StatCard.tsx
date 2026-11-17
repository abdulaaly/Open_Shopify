import React from "react";
import { cn } from "../utils.js";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  delta?: {
    value: string;
    trend: "up" | "down" | "neutral";
    label?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  delta,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
        <span className="text-xs font-medium tracking-wide uppercase">{title}</span>
        {icon && <div className="text-slate-400 dark:text-slate-500">{icon}</div>}
      </div>

      <div className="mt-2.5 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
          {value}
        </span>

        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
              delta.trend === "up" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
              delta.trend === "down" && "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
              delta.trend === "neutral" && "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            )}
          >
            {delta.trend === "up" && <TrendingUp className="w-3 h-3" />}
            {delta.trend === "down" && <TrendingDown className="w-3 h-3" />}
            {delta.value}
          </span>
        )}
      </div>

      {delta?.label && (
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          {delta.label}
        </p>
      )}
    </div>
  );
};
