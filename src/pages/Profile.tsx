import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Home,
  Users,
  Award,
  Edit2,
  ChevronRight,
  LayoutGrid,
  History,
  ShieldCheck,
  Copy,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import type { UserProfile } from "../types";
import InfoCard from "../components/profile/InfoCard";

const MOCK_USER: UserProfile = {
  userId: "NITP-2021-CSE-042",
  name: "Aryan Sharma",
  email: "aryan.sharma.cse21@nitp.ac.in",
  phone: "+91 1111 00000",
  hostel: "Bhabha Hostel, Room 402",
  club: "Robotics Club (RoboNIT)",
  loyaltyPoints: 1250,
  savedDesigns: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEMHPVWDoOiq6W7-yb6aQmtg7_PIVR7SJg01qS3IM-7nUL50xYN51Fai4u7WfsZJGJSAP19H7TmVmu3MufPi84tGADvUlFP4aJ3XFBeaAI8ZoPhKKfTBbTTkOHDgUf6gkiT70KqEBdvtMJWGW7vakzhd7FWBNR34yrRtNmqSdxp5SQ2NxNZIj917w09ser6bmpIy9Sr6-RgdHnRhRjOpDKxH81GuTX3KcItikuxN9tVAzl5iOocf4D6VdxWdYp3A2KgybGsAP4FRFZ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTNDDr4RFymDerFitQ6XKJwZhSULZ470xAEw1tsAa6ek2fR49k5jdv6DrymGOxcPlMDI54pKDaNwmpRFQS7F81lXZbTbfsBCh3kTqGCiI7JFGwLQz05aEQFlVCOfQn-qALeSsl5sB2Gftz-JRUU6VI13PGC1OEAgcElhG1N5LjVPB7DQ4NVexjflU-cVV3MOFWV4ewClw77hBOGc1sX0JhsOL_Ap7WDlChp5re75gJyDnRUUn5qK9gHdT57ivldItwGcd6WW5w1RNA",
  ],
  addresses: [
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

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8 space-y-8">
      {/* Profile Header */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-primary p-8 md:p-12 shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <User size={300} className="text-white -mr-20" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="size-32 md:size-40 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl font-black text-white shadow-xl shadow-black/10">
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-1 right-1 size-10 bg-white text-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Edit2 size={18} />
            </button>
          </div>
          <div className="text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {user.name}
              </h1>
              <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <ShieldCheck size={12} /> Verified Student
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  ID: {user.userId}
                </span>
                <button className="hover:text-white transition-colors">
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 pt-2">
              <div className="bg-amber-400 text-amber-950 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-amber-400/20">
                <Award size={24} className="shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 leading-none mb-1 tracking-widest">
                    Campus Coins
                  </p>
                  <p className="text-xl font-black leading-none">
                    {user.loyaltyPoints}
                  </p>
                </div>
              </div>
              <Link
                to="/orders"
                className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 justify-center"
              >
                <History size={18} /> Order History
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Grid */}
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard icon={Mail} label="Email Address" value={user.email} />
            <InfoCard icon={Phone} label="Phone Number" value={user.phone} />
            <InfoCard
              icon={Home}
              label="Campus Residence"
              value={user.hostel}
            />
            <InfoCard icon={Users} label="College Club" value={user.club} />
          </div>

          {/* Saved Addresses Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
                <MapPin className="text-primary" size={24} /> Saved Addresses
              </h3>
              <button className="text-xs font-black text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2 uppercase tracking-widest">
                <Plus size={16} /> Add New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-6 rounded-2xl border-2 transition-all relative group ${
                    addr.isDefault
                      ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                      : "border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark"
                  }`}
                >
                  {addr.isDefault && (
                    <span className="absolute -top-2.5 left-4 px-2.5 py-1 bg-primary text-white text-[9px] font-black rounded-lg uppercase tracking-wider shadow-md">
                      DEFAULT
                    </span>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2.5 rounded-xl ${
                          addr.isCampus
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {addr.isCampus ? (
                          <Home size={18} />
                        ) : (
                          <MapPin size={18} />
                        )}
                      </div>
                      <h4 className="font-bold text-sm dark:text-white">
                        {addr.label}
                      </h4>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-text-sub">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {addr.isCampus ? (
                      <>
                        <p className="text-sm font-bold dark:text-gray-200">
                          {addr.hostelName}
                        </p>
                        <p className="text-xs text-text-sub dark:text-gray-400 font-medium">
                          Room: {addr.roomNumber}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-bold dark:text-gray-200 leading-tight">
                          {addr.fullAddress}
                        </p>
                        <p className="text-xs text-text-sub dark:text-gray-400 font-medium">
                          {addr.city}, {addr.pincode}
                        </p>
                      </>
                    )}
                  </div>
                  {!addr.isDefault && (
                    <button className="mt-4 text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
                      Set as Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Saved Designs */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
                <LayoutGrid className="text-primary" size={24} /> Saved Designs
              </h3>
              <button className="text-xs font-black text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {user.savedDesigns.map((design, i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark shadow-sm hover:shadow-xl transition-all"
                >
                  <img
                    src={design}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="w-full bg-white text-primary text-xs font-black py-2.5 rounded-xl shadow-xl uppercase tracking-wider">
                      Edit Design
                    </button>
                  </div>
                </div>
              ))}
              <button className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center p-4 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="size-14 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-text-sub dark:text-gray-400 group-hover:text-primary mb-3 text-3xl font-light transition-colors">
                  +
                </div>
                <p className="text-[10px] font-black text-text-sub dark:text-gray-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                  Create Design
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings / Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="text-lg font-black dark:text-white mb-2">
              Account Hub
            </h3>
            <div className="space-y-1">
              {[
                { label: "My Orders", icon: History, path: "/orders" },
                { label: "Security & Password", icon: ShieldCheck, path: "#" },
                { label: "Campus Addresses", icon: Home, path: "#" },
                { label: "Saved Designs", icon: LayoutGrid, path: "#" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm font-bold text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">
                    <item.icon
                      size={20}
                      className="text-text-sub group-hover:text-primary transition-colors"
                    />
                    {item.label}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-white space-y-4 shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
              <Award size={150} />
            </div>
            <h4 className="font-black text-xl relative z-10">
              Refer a Student
            </h4>
            <p className="text-xs text-blue-50 font-medium leading-relaxed relative z-10 opacity-80">
              Give 100 Campus Coins to a friend and get 200 when they place
              their first order!
            </p>
            <button className="w-full bg-white text-primary font-black py-3.5 rounded-2xl text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all relative z-10 uppercase tracking-widest">
              Get Invite Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
