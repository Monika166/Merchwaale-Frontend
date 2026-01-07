import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  School,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { login } from "../slices/authSlice";
import FormInput from "../components/shared/FormInput";

interface SignupForm {
  name: string;
  email: string;
  department: string;
  batch: string;
  password: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const onSignup = (data: SignupForm) => {
    setTimeout(() => {
      // Fix: Added missing 'role' property to satisfy User interface defined in authSlice
      dispatch(
        login({
          name: data.name,
          email: data.email,
          department: data.department,
          batch: data.batch,
          points: 50, // Welcome bonus
          role: "student",
        })
      );
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 size-48 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-4">
                <UserPlus size={32} />
              </div>
              <h1 className="text-3xl font-black dark:text-white tracking-tight">
                Join Merchwaale
              </h1>
              <p className="text-text-sub dark:text-gray-400 mt-2 font-medium">
                Official student-only merch hub of NIT Patna
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSignup)}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
            >
              <FormInput
                label="Full Name"
                placeholder="Aryan Sharma"
                icon={User}
                className="md:col-span-2"
                error={errors.name?.message}
                register={register("name", { required: "Name is required" })}
              />

              <FormInput
                label="Institute Email"
                placeholder="roll_no@nitp.ac.in"
                icon={Mail}
                className="md:col-span-2"
                error={errors.email?.message}
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@nitp\.ac\.in$/i,
                    message: "Use @nitp.ac.in email",
                  },
                })}
              />

              <FormInput
                label="Department"
                placeholder="Choose Dept"
                icon={School}
                options={[
                  "Computer Science (CSE)",
                  "Electronics (ECE)",
                  "Electrical (EE)",
                  "Mechanical (ME)",
                  "Civil (CE)",
                ]}
                error={errors.department?.message}
                register={register("department", { required: "Pick one" })}
              />

              <FormInput
                label="Batch (Year)"
                placeholder="e.g. 2027"
                icon={Calendar}
                error={errors.batch?.message}
                register={register("batch", {
                  required: "Batch required",
                  pattern: { value: /^[0-9]{4}$/, message: "Use YYYY" },
                })}
              />

              <FormInput
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                icon={Lock}
                className="md:col-span-2"
                error={errors.password?.message}
                register={register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Too short" },
                })}
              />

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group transition-all disabled:opacity-70 disabled:scale-95"
                >
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Student Account"}
                  {!isSubmitting && (
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </button>
              </div>
            </form>

            <div className="pt-6 border-t border-gray-50 dark:border-gray-800 text-center">
              <p className="text-sm text-text-sub dark:text-gray-400 font-medium">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="text-primary font-black hover:underline"
                >
                  Log in here
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

export default Signup;
