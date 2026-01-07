import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Info,
  Check,
  Plus,
  Home,
  UserCheck,
} from "lucide-react";
import type { RootState } from "../redux/store";
import { clearCart } from "../slices/cartSlice";

const MOCK_USER_DATA = {
  name: "Aryan Sharma",
  email: "aryan.sharma.cse21@nitp.ac.in",
  phone: "+91 98765 43210",
  savedAddresses: [
    {
      id: "1",
      label: "Campus / Hostel",
      isCampus: true,
      hostelName: "Bhabha Hostel",
      roomNumber: "402-A",
      isDefault: true,
    },
    {
      id: "2",
      label: "Home (Patna)",
      isCampus: false,
      fullAddress: "Plot 12, Kankarbagh Colony, Near Kendriya Vidyalaya",
      city: "Patna",
      pincode: "800020",
      isDefault: false,
    },
  ],
};

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"campus" | "outside">(
    "campus"
  );

  const initialAddress =
    MOCK_USER_DATA.savedAddresses.find(
      (a) => a.isCampus === (deliveryType === "campus")
    )?.id || "";
  const [selectedAddressId, setSelectedAddressId] = useState(initialAddress);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = deliveryType === "campus" ? 0 : 60;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOrdered(true);
      dispatch(clearCart());
    }, 1500);
  };

  const currentAddress = MOCK_USER_DATA.savedAddresses.find(
    (a) => a.id === selectedAddressId
  );
  const visibleAddresses = MOCK_USER_DATA.savedAddresses.filter((addr) =>
    deliveryType === "campus" ? addr.isCampus : !addr.isCampus
  );

  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="size-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
            <CheckCircle2 size={60} />
          </div>
          <div>
            <h1 className="text-3xl font-black dark:text-white">
              Order Confirmed!
            </h1>
            <p className="text-text-sub dark:text-gray-400 mt-2">
              Your order #NITP-8829 has been successfully placed.
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-primary/10 rounded-2xl border border-blue-100 dark:border-primary/20 text-sm text-left flex gap-3">
            <Info className="text-primary shrink-0" size={20} />
            <p className="text-text-sub dark:text-blue-200/70">
              {deliveryType === "campus"
                ? `Delivery to ${
                    currentAddress?.hostelName || "Hostel"
                  } scheduled for tomorrow.`
                : "Standard delivery takes 3-5 business days to your Patna address."}
            </p>
          </div>
          <Link
            to="/"
            className="inline-block w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
          <Truck size={40} />
        </div>
        <h2 className="text-2xl font-bold dark:text-white">
          Your bag is empty
        </h2>
        <Link
          to="/shop"
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
      <div className="flex items-center gap-2 mb-8 text-sm font-bold text-text-sub">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-primary flex items-center gap-1 transition-colors"
        >
          <ChevronLeft size={18} /> Back to Shop
        </button>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-text-main dark:text-white">Smart Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          <section className="bg-blue-50/40 dark:bg-primary/5 p-6 rounded-3xl border border-blue-100 dark:border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <UserCheck size={80} className="text-primary" />
            </div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                  {MOCK_USER_DATA.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-black dark:text-white">
                    {MOCK_USER_DATA.name}
                  </h2>
                  <p className="text-xs text-text-sub dark:text-gray-400 font-bold flex items-center gap-1">
                    <ShieldCheck size={14} className="text-green-500" /> NIT
                    Patna Verified Account
                  </p>
                </div>
              </div>
              <Link
                to="/profile"
                className="text-xs font-black text-primary bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-primary/10 hover:shadow-sm transition-all"
              >
                Edit Profile
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl border border-white dark:border-gray-700 shadow-sm">
                <p className="text-[10px] uppercase font-black text-text-sub mb-1 tracking-widest">
                  Verified Phone
                </p>
                <p className="font-bold dark:text-white">
                  {MOCK_USER_DATA.phone}
                </p>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl border border-white dark:border-gray-700 shadow-sm">
                <p className="text-[10px] uppercase font-black text-text-sub mb-1 tracking-widest">
                  Verified Email
                </p>
                <p className="font-bold dark:text-white truncate">
                  {MOCK_USER_DATA.email}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Truck size={22} />
              </div>
              <h2 className="text-xl font-black dark:text-white">
                Delivery Preference
              </h2>
            </div>

            <div className="flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => {
                  setDeliveryType("campus");
                  const firstCampus = MOCK_USER_DATA.savedAddresses.find(
                    (a) => a.isCampus
                  );
                  if (firstCampus) setSelectedAddressId(firstCampus.id);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  deliveryType === "campus"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-text-sub hover:text-text-main dark:hover:text-white"
                }`}
              >
                <Home size={18} /> On Campus
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeliveryType("outside");
                  const firstOutside = MOCK_USER_DATA.savedAddresses.find(
                    (a) => !a.isCampus
                  );
                  if (firstOutside) setSelectedAddressId(firstOutside.id);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  deliveryType === "outside"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-text-sub hover:text-text-main dark:hover:text-white"
                }`}
              >
                <MapPin size={18} /> Outside Campus
              </button>
            </div>

            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-text-sub uppercase tracking-wider">
                  Select Saved Address
                </p>
                <Link
                  to="/profile"
                  className="text-[10px] font-black text-primary hover:underline flex items-center gap-1"
                >
                  Manage Addresses <ArrowRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleAddresses.map((addr) => (
                  <button
                    type="button"
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all relative group ${
                      selectedAddressId === addr.id
                        ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                        : "border-gray-100 dark:border-gray-800 hover:border-primary/30 bg-white dark:bg-card-dark"
                    }`}
                  >
                    {selectedAddressId === addr.id && (
                      <div className="absolute top-3 right-3 size-6 bg-primary rounded-full flex items-center justify-center text-white shadow-md">
                        <Check size={14} />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      {addr.isCampus ? (
                        <Home size={16} className="text-primary" />
                      ) : (
                        <MapPin size={16} className="text-primary" />
                      )}
                      <h4 className="font-bold text-sm dark:text-white">
                        {addr.label}
                      </h4>
                    </div>
                    <p className="text-xs text-text-sub dark:text-gray-400 leading-relaxed font-medium">
                      {addr.isCampus
                        ? `${addr.hostelName}, Room ${addr.roomNumber}`
                        : `${addr.fullAddress}, ${addr.city} - ${addr.pincode}`}
                    </p>
                  </button>
                ))}

                <button
                  type="button"
                  className="p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group text-center min-h-[100px]"
                >
                  <div className="size-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-text-sub group-hover:text-primary transition-colors">
                    <Plus size={20} />
                  </div>
                  <span className="text-xs font-bold text-text-sub group-hover:text-primary transition-colors">
                    Add Custom Address
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <CreditCard size={22} />
              </div>
              <h2 className="text-xl font-black dark:text-white">
                Payment Selection
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: "upi", icon: <Smartphone />, label: "UPI / GPay" },
                { id: "card", icon: <CreditCard />, label: "Saved Card" },
                { id: "cod", icon: <Truck />, label: "Cash on Delivery" },
              ].map((method) => (
                <label key={method.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    className="peer hidden"
                    defaultChecked={method.id === "upi"}
                  />
                  <div className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:ring-4 peer-checked:ring-primary/5 transition-all text-text-sub dark:text-gray-400 peer-checked:text-primary h-full">
                    <div className="mb-3 scale-110">{method.icon}</div>
                    <span className="text-sm font-black">{method.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-[2rem] p-6 lg:p-8 border border-gray-100 dark:border-gray-800 shadow-2xl space-y-6">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
                Order Review
              </h3>

              <div className="max-h-64 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                {cart.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="size-16 rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-black dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-text-sub dark:text-gray-400 mt-1 uppercase font-black tracking-wider">
                        Size: {item.selectedSize}{" "}
                        <span className="mx-1">•</span> Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-black text-primary">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-sub dark:text-gray-400 font-bold">
                    Items Total
                  </span>
                  <span className="font-bold dark:text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-sub dark:text-gray-400 font-bold">
                    Delivery Fee
                  </span>
                  <span
                    className={`font-black ${
                      shipping === 0 ? "text-green-600" : "dark:text-white"
                    }`}
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-2 border-t border-gray-50 dark:border-gray-800">
                  <span className="dark:text-white">To Pay</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              <button
                disabled={loading || !selectedAddressId}
                onClick={handlePlaceOrder}
                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-2 transition-all group disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    Confirm & Pay ₹{total}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
