import React from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  Package,
  Users,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  Gift,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../constants";
import ProductCard from "../components/shared/ProductCard";

const Home: React.FC = () => {
  const freshersKits = PRODUCTS.filter((p) => p.category === "Freshers");

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-6 space-y-12">
      {/* Hero Section */}
      <section
        className="rounded-3xl overflow-hidden relative shadow-lg min-h-[400px] md:min-h-[500px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtY6twsewmS2mDtqObnUwQfXS7wkmeV9NYzV3pfyRNlfRA_2E_-zHfu4QDZJwJeUeA6s8Odj0jOAVB3b0TLicD7gCAHYMRXgZ6I9zOU_CSPNYKUec7gq240T3KYhnB2FiwqJCTuIvy7umKm72nithH6tyMXELEOgHxTp42TfWi60fs6ejD61CWKz7lCjxnP34pCQxmdntaZ9d41ynsP72TapY6eWrH9DqTQIMI3wR1JSAgSeBsXq4F65T7p7SZHiB1gsiC9KllOJKY')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"></div>
        <div className="relative z-10 p-6 md:p-12 lg:p-16 w-full max-w-2xl flex flex-col gap-4 md:gap-6">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white w-fit uppercase tracking-wider border border-white/30 flex items-center gap-2">
            <Sparkles size={12} /> Official Store
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Freshers Kits – <br className="hidden md:block" /> Everything for
            Hostel Life
          </h1>
          <p className="text-gray-200 text-sm md:text-lg max-w-lg font-medium">
            Official NIT Patna merchandise crafted for you. From hoodies to lab
            coats, get your campus essentials today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/customise"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            >
              <Palette size={20} />
              Design Your Merch
            </Link>
            <Link
              to="/shop?cat=Freshers"
              className="bg-white text-primary px-8 py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 text-center shadow-lg hover:scale-105"
            >
              <Package size={20} />
              Shop Freshers Kits
            </Link>
          </div>
        </div>
      </section>

      {/* Freshers Specific Showcase */}
      <section className="bg-[#f0f4ff] dark:bg-blue-900/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 opacity-5 dark:opacity-10 rotate-12">
          <Gift size={400} />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-3">
              <Zap size={16} /> Exclusive Bundles
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight">
              Must-Have Freshers Kits
            </h2>
            <p className="text-text-sub dark:text-gray-400 mt-2 font-medium max-w-xl">
              Save up to 40% when you buy essential bundles. We deliver directly
              to your assigned hostel room.
            </p>
          </div>
          <Link
            to="/shop?cat=Freshers"
            className="bg-white dark:bg-gray-800 text-primary dark:text-white px-6 py-3 rounded-2xl font-black shadow-sm flex items-center gap-2 hover:shadow-md transition-all"
          >
            View All Bundles <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {freshersKits.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: <Palette className="text-purple-600" />,
            title: "Customise",
            sub: "Design your own tee",
            color: "bg-purple-100",
            link: "/customise",
          },
          {
            icon: <Package className="text-primary" />,
            title: "Freshers Kits",
            sub: "Bundled essentials",
            color: "bg-blue-100",
            link: "/shop?cat=Freshers",
          },
          {
            icon: <Users className="text-orange-600" />,
            title: "Club Store",
            sub: "Official club merch",
            color: "bg-orange-100",
            link: "/shop?cat=Clubs",
          },
          {
            icon: <Calendar className="text-green-600" />,
            title: "Events",
            sub: "Fest & event gear",
            color: "bg-green-100",
            link: "/shop?cat=Events",
          },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="bg-white dark:bg-card-dark border border-[#e7ebf3] dark:border-gray-800 p-5 rounded-2xl flex flex-col gap-3 hover:shadow-md transition-shadow group"
          >
            <div
              className={`w-12 h-12 rounded-xl ${item.color} dark:bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-text-main dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-text-sub mt-1">{item.sub}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Shop By Category */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <Link
            to="/shop"
            className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?cat=${cat.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card-dark border border-[#e7ebf3] dark:border-gray-800 p-2 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative mb-3">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-lg font-bold text-text-main dark:text-white">
                  {cat.name}
                </h3>
                <p className="text-sm text-text-sub mt-1">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
