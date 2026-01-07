import React from "react";
import { type LucideIcon, ChevronDown } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  register: UseFormRegisterReturn;
  options?: string[]; // If options are provided, it renders a select
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  register,
  options,
  className = "",
}) => {
  const isSelect = !!options;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center ml-1">
        <label className="text-[10px] font-black text-text-sub dark:text-gray-500 uppercase tracking-widest">
          {label}
        </label>
        {error && (
          <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter animate-shake">
            {error}
          </span>
        )}
      </div>

      <div className="relative group">
        {Icon && (
          <Icon
            size={18}
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              error
                ? "text-red-400"
                : "text-text-sub group-focus-within:text-primary"
            }`}
          />
        )}

        {isSelect ? (
          <div className="relative">
            <select
              {...register}
              className={`w-full ${
                Icon ? "pl-12" : "pl-4"
              } pr-10 py-4 bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl text-sm transition-all appearance-none cursor-pointer focus:ring-4 focus:ring-primary/10 ${
                error
                  ? "border-red-100 dark:border-red-900/30 text-red-900 dark:text-red-200"
                  : "border-transparent focus:border-primary/20 dark:text-white"
              }`}
            >
              <option value="" disabled>
                {placeholder || `Select ${label}`}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt} className="dark:bg-[#101622]">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none"
            />
          </div>
        ) : (
          <input
            {...register}
            type={type}
            placeholder={placeholder}
            className={`w-full ${
              Icon ? "pl-12" : "pl-4"
            } pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-primary/10 ${
              error
                ? "border-red-100 dark:border-red-900/30 text-red-900 dark:text-red-200 placeholder:text-red-300"
                : "border-transparent focus:border-primary/20 dark:text-white placeholder:text-text-sub"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;
