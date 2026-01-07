import React from "react";
import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => (
  <div className="bg-white dark:bg-card-dark p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex gap-4 items-start shadow-sm hover:border-primary transition-colors">
    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
      <Icon size={20} />
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-text-main dark:text-white truncate">
        {value}
      </p>
    </div>
  </div>
);

export default InfoCard;
