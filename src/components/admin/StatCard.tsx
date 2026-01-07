import React from "react";
import { TrendingDown, type LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  isPositive: boolean;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  isPositive,
  color,
}) => (
  <div className="bg-white dark:bg-card-dark p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}
      >
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <div
        className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-xs font-black text-text-sub dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
        {title}
      </p>
      <h3 className="text-3xl font-black dark:text-white tracking-tight">
        {value}
      </h3>
    </div>
  </div>
);

export default StatCard;
