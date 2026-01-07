import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Settings,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Award,
  LayoutDashboard,
} from "lucide-react";
import { logout } from "../../slices/authSlice.tsx";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    points: number;
    role?: "student" | "admin";
  };
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };

  const isAdmin = user.role === "admin";

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-5 bg-primary/5 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="size-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="font-bold text-text-main dark:text-white truncate">
              {user.name}
            </h4>
            <p className="text-xs text-text-sub dark:text-gray-400 truncate font-medium">
              {user.email}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-xl border border-primary/10">
          <div className="flex items-center gap-2">
            <Award className="text-amber-500" size={16} />
            <span className="text-xs font-black dark:text-white">
              {user.points} Points
            </span>
          </div>
          <Link
            to="/profile"
            onClick={onClose}
            className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter"
          >
            View Rewards
          </Link>
        </div>
      </div>

      <div className="p-2">
        {isAdmin && (
          <Link
            to="/admin"
            onClick={onClose}
            className="flex items-center justify-between p-3 mb-1 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors group border border-primary/10"
          >
            <div className="flex items-center gap-3 text-sm font-black text-primary">
              <LayoutDashboard size={18} className="text-primary" />
              Admin Dashboard
            </div>
            <ChevronRight size={14} className="text-primary" />
          </Link>
        )}
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="flex items-center gap-3 text-sm font-bold text-text-main dark:text-gray-200">
            <User
              size={18}
              className="text-text-sub group-hover:text-primary transition-colors"
            />
            My Profile
          </div>
          <ChevronRight size={14} className="text-gray-300" />
        </Link>
        <Link
          to="/orders"
          onClick={onClose}
          className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="flex items-center gap-3 text-sm font-bold text-text-main dark:text-gray-200">
            <Package
              size={18}
              className="text-text-sub group-hover:text-primary transition-colors"
            />
            My Orders
          </div>
          <ChevronRight size={14} className="text-gray-300" />
        </Link>
        <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-left">
          <div className="flex items-center gap-3 text-sm font-bold text-text-main dark:text-gray-200">
            <Heart
              size={18}
              className="text-text-sub group-hover:text-primary transition-colors"
            />
            Saved Designs
          </div>
          <ChevronRight size={14} className="text-gray-300" />
        </button>
      </div>

      <div className="p-2 border-t border-gray-50 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-black transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserModal;
