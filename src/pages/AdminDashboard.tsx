import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
} from "lucide-react";
import type { RootState } from "../redux/store";
import { PRODUCTS } from "../constants";
import StatCard from "../components/admin/StatCard";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "inventory"
  >("overview");

  if (!isLoggedIn || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const MOCK_ADMIN_ORDERS = [
    {
      id: "NITP-8821",
      customer: "Aryan Sharma",
      email: "aryan.s@nitp.ac.in",
      total: 1299,
      status: "Processing",
      date: "2 mins ago",
    },
    {
      id: "NITP-8822",
      customer: "Sana Khan",
      email: "sana.k@nitp.ac.in",
      total: 599,
      status: "Shipped",
      date: "15 mins ago",
    },
    {
      id: "NITP-8823",
      customer: "Rahul Dev",
      email: "rahul.d@nitp.ac.in",
      total: 2499,
      status: "Delivered",
      date: "1 hour ago",
    },
    {
      id: "NITP-8824",
      customer: "Priya M.",
      email: "priya.m@nitp.ac.in",
      total: 1899,
      status: "Pending",
      date: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0d121b]">
      {/* Admin Header */}
      <div className="bg-white dark:bg-[#101622] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black dark:text-white tracking-tight">
                Admin Control Panel
              </h1>
              <p className="text-[10px] font-black text-text-sub uppercase tracking-[0.2em] mt-0.5">
                Campus Logistics Management
              </p>
            </div>
          </div>
          <div className="hidden md:flex bg-gray-50 dark:bg-gray-800 p-1 rounded-2xl border border-gray-100 dark:border-gray-700">
            {["overview", "orders", "inventory"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-text-sub hover:text-text-main dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8 space-y-8">
        {activeTab === "overview" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Monthly Revenue"
                value="₹1,24,500"
                icon={TrendingUp}
                trend="+12.5%"
                isPositive={true}
                color="bg-primary"
              />
              <StatCard
                title="Active Orders"
                value="42"
                icon={ShoppingBag}
                trend="+8%"
                isPositive={true}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Students"
                value="1,840"
                icon={Users}
                trend="+5.2%"
                isPositive={true}
                color="bg-purple-500"
              />
              <StatCard
                title="Low Stock Alert"
                value="12"
                icon={AlertTriangle}
                trend="-2%"
                isPositive={false}
                color="bg-red-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders List */}
              <div className="lg:col-span-8 bg-white dark:bg-card-dark rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                  <h3 className="text-xl font-black dark:text-white">
                    Recent Transactions
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-black text-primary hover:underline uppercase tracking-widest flex items-center gap-1"
                  >
                    View All <ArrowUpRight size={14} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-text-sub">
                        <th className="px-8 py-5">Order ID</th>
                        <th className="px-8 py-5">Student</th>
                        <th className="px-8 py-5">Amount</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {MOCK_ADMIN_ORDERS.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="px-8 py-6">
                            <span className="font-black dark:text-white">
                              {order.id}
                            </span>
                            <p className="text-[10px] text-text-sub mt-1">
                              {order.date}
                            </p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="font-bold dark:text-white">
                              {order.customer}
                            </span>
                            <p className="text-xs text-text-sub truncate max-w-[150px]">
                              {order.email}
                            </p>
                          </td>
                          <td className="px-8 py-6 font-black text-primary">
                            ₹{order.total}
                          </td>
                          <td className="px-8 py-6">
                            <span
                              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                order.status === "Processing"
                                  ? "bg-amber-100 text-amber-700"
                                  : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                              <MoreHorizontal
                                size={18}
                                className="text-text-sub"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions / Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-black">Stock Management</h3>
                    <p className="text-xs text-blue-100 leading-relaxed font-medium">
                      Add new campus collections or update existing inventory
                      levels instantly.
                    </p>
                    <Link
                      to="/admin/add-product"
                      className="w-full bg-white text-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
                    >
                      <Plus size={20} /> New Product
                    </Link>
                  </div>
                  <Package className="absolute -bottom-10 -right-10 opacity-10 size-48 rotate-12" />
                </div>

                <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 space-y-6">
                  <h4 className="font-black dark:text-white flex items-center gap-2">
                    <Clock className="text-primary" size={20} /> Pending
                    Approvals
                  </h4>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent hover:border-primary/20 transition-all cursor-pointer"
                      >
                        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Users size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold dark:text-white truncate">
                            New Vendor Request
                          </p>
                          <p className="text-[10px] text-text-sub uppercase font-black tracking-tighter">
                            Robotics Club Merch
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-gray-300 self-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h2 className="text-2xl font-black dark:text-white">
                Order Management
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-sub" />
                  <input
                    className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-xl border-none text-xs font-bold w-full md:w-64"
                    placeholder="Search orders..."
                  />
                </div>
                <button className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-text-sub">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-text-sub">
                    <tr>
                      <th className="px-8 py-5">Order ID</th>
                      <th className="px-8 py-5">Customer</th>
                      <th className="px-8 py-5">Details</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {MOCK_ADMIN_ORDERS.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-8 py-6 font-black dark:text-white">
                          {order.id}
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-bold dark:text-white block">
                            {order.customer}
                          </span>
                          <span className="text-xs text-text-sub">
                            {order.email}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-black text-primary">
                            ₹{order.total}
                          </p>
                          <p className="text-[10px] text-text-sub uppercase font-bold">
                            {order.date}
                          </p>
                        </td>
                        <td className="px-8 py-6">
                          <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-[10px] font-black uppercase tracking-widest px-3 py-1 cursor-pointer">
                            <option>{order.status}</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                          </select>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-xs font-black text-primary hover:underline">
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black dark:text-white">
                Product Inventory
              </h2>
              <Link
                to="/admin/add-product"
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Plus size={18} /> Add Product
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-card-dark p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-5 shadow-sm group hover:border-primary transition-all"
                >
                  <div className="size-20 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                    <img
                      src={product.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm dark:text-white truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-text-sub mb-2">
                      Stock:{" "}
                      <span
                        className={`font-black ${
                          product.stock < 10 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-primary">
                        ₹{product.price}
                      </span>
                      <button className="text-[10px] font-black uppercase tracking-widest text-text-sub hover:text-primary transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
