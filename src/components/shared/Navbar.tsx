import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ArrowLeft,
  LogIn,
} from "lucide-react";
import type { RootState } from "../../redux/store";
import { setCartOpen } from "../../slices/cartSlice";
import UserModal from "./UserModal";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchQuery = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (searchQuery.current) {
      searchQuery.current.value = searchParams.get("s") || "";
    }
  }, [searchParams]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchQuery.current?.value != "") {
      navigate(`/shop?s=${searchQuery.current?.value}`);
    }
  };

  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Customise", path: "/customise" },
    { name: "Thesis", path: "#" },
  ];

  const activeLink = (path: string) =>
    location.pathname === path
      ? "text-primary font-bold"
      : "text-text-main dark:text-gray-300 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/90 backdrop-blur-md border-b border-[#e7ebf3] dark:border-gray-800 px-2 sm:px-4 lg:px-10 py-3 min-h-[64px] flex items-center">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        {isSearchOpen ? (
          <div className="absolute inset-0 z-50 bg-white dark:bg-[#101622] flex items-center px-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-text-sub"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 relative ml-2">
              <input
                ref={searchQuery}
                defaultValue={searchQuery.current?.value}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full pr-10 pl-4 py-2.5 bg-[#e7ebf3] dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-text-sub dark:text-white"
                placeholder="Search campus gear..."
              />

              <Search
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-text-sub"
              />
            </div>

            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-3 font-bold text-primary text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-1 sm:gap-3 text-primary"
              >
                <div className="size-6 sm:size-8">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                  </svg>
                </div>
                <h2 className="text-[#0d121b] dark:text-white text-lg sm:text-xl font-bold tracking-tight sm:block">
                  Merchwaale
                </h2>
              </Link>
              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={activeLink(link.path)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-1 justify-center max-w-md px-4 hidden md:flex">
              <div className="relative w-full group">
                <input
                  defaultValue={searchQuery.current?.value}
                  ref={searchQuery}
                  onKeyDown={handleKeyDown}
                  className="w-full pr-10 pl-4 py-2.5 bg-[#e7ebf3] dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-text-sub dark:text-white"
                  placeholder="Search hoodies, lab kits..."
                />

                <Search
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-text-sub group-focus-within:text-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 relative">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-xl bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white"
              >
                <Search size={20} />
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => dispatch(setCartOpen(true))}
                    className="relative p-2 rounded-xl bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white hover:bg-primary/10 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setIsUserModalOpen(!isUserModalOpen)}
                    className={`p-2 rounded-xl transition-colors ${
                      isUserModalOpen
                        ? "bg-primary text-white"
                        : "bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white"
                    }`}
                  >
                    <User size={20} />
                  </button>

                  <UserModal
                    isOpen={isUserModalOpen}
                    onClose={() => setIsUserModalOpen(false)}
                    user={user || { name: "Student", email: "", points: 0 }}
                  />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <LogIn size={16} /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden sm:block px-4 py-2 bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white text-sm font-black rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Join
                  </Link>
                </div>
              )}

              <button
                className="lg:hidden p-2 rounded-xl bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white hover:bg-primary/10 transition-colors"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </>
        )}
      </div>

      {!isSearchOpen && isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#101622] border-b border-[#e7ebf3] dark:border-gray-800 p-4 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-bold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
