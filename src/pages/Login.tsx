import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Info,
  UserCheck,
} from "lucide-react";
import { login } from "../slices/authSlice.tsx";
import FormInput from "../components/shared/FormInput";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onLogin = (data: LoginForm) => {
    // Special check for admin credentials
    const isAdmin = data.email === "admin" && data.password === "admin";

    // Simulate API call delay
    setTimeout(() => {
      if (isAdmin) {
        dispatch(
          login({
            name: "Super Admin",
            email: "admin@merchwaale.com",
            role: "admin",
            points: 9999,
          })
        );
      } else {
        dispatch(
          login({
            name: "Aryan Sharma",
            email: data.email,
            department: "Computer Science (CSE)",
            batch: "2026",
            points: 1250,
            role: "student",
          })
        );
      }
      navigate(isAdmin ? "/admin" : "/");
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 size-48 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
                <LogIn size={32} />
              </div>
              <h1 className="text-3xl font-black dark:text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="text-text-sub dark:text-gray-400 mt-2 font-medium">
                Log in to your NITP Student Account
              </p>
            </div>

            <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
              <FormInput
                label="ID / Institute Email"
                placeholder="roll_no@nitp.ac.in or 'admin'"
                icon={Mail}
                error={errors.email?.message}
                register={register("email", {
                  required: "Credential is required",
                })}
              />

              <div className="relative">
                <FormInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  error={errors.password?.message}
                  register={register("password", {
                    required: "Password required",
                  })}
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 text-[9px] font-black text-primary hover:underline uppercase tracking-tighter"
                >
                  Forgot?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Authenticating..." : "Log In"}
                {!isSubmitting && (
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </button>
            </form>

            {/* Demo Hint Box */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
              <Info className="text-primary shrink-0" size={18} />
              <div className="text-[11px] font-medium text-text-sub dark:text-gray-400">
                <p className="font-black text-primary uppercase tracking-widest mb-1">
                  Access Levels
                </p>
                Student: Use{" "}
                <span className="text-text-main dark:text-white font-bold">
                  @nitp.ac.in
                </span>{" "}
                email. <br />
                Admin: Use{" "}
                <span className="text-text-main dark:text-white font-bold">
                  admin / admin
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50 dark:border-gray-800 text-center">
              <p className="text-sm text-text-sub dark:text-gray-400 font-medium">
                New on campus?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-black hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] font-black text-text-sub uppercase tracking-widest opacity-50">
              <ShieldCheck size={14} /> Secured NITP Auth
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
