import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  ChevronRight,
  School,
  Ruler,
  Truck,
  Minus,
  Plus,
  Share2,
  RotateCcw,
  LogIn,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../constants";
import type { RootState } from "../redux/store";
import { addItem } from "../slices/cartSlice";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const activeCategory = CATEGORIES.find((c) => c.id === product.category);
  const activeSubCategory = activeCategory?.subCategories.find(
    (s) => s.id === product.subCategory
  );

  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(
      addItem({
        product,
        quantity,
        size: selectedSize,
        customName: selectedColor,
      })
    );
  };

  const sizeVariants = product.variants?.find(
    (v) => v.type === "size"
  )?.options;

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-sub">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="opacity-50" />
        <Link to="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        {activeCategory && (
          <>
            <ChevronRight size={12} className="opacity-50" />
            <Link
              to={`/shop?cat=${activeCategory.id}`}
              className="hover:text-primary transition-colors"
            >
              {activeCategory.name}
            </Link>
          </>
        )}
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-text-main dark:text-white">{product.name}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] overflow-hidden relative border border-gray-100 dark:border-gray-700 shadow-sm max-w-2xl mx-auto w-full">
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
              {product.isCustomizable && (
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider">
                  Customizable
                </span>
              )}
            </div>
            <button className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-black/40 backdrop-blur rounded-2xl text-text-main dark:text-white shadow-sm hover:scale-110 transition-transform">
              <Share2 size={20} />
            </button>
            <img
              src={activeImage}
              className="w-full h-full object-cover transition-opacity duration-300"
              alt={product.name}
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex justify-center gap-4 px-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`size-20 md:size-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === img
                    ? "border-primary shadow-lg scale-105"
                    : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`${product.name} thumbnail ${idx + 1}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                {activeSubCategory?.name}
              </span>
              {product.department && (
                <span className="text-[10px] font-black uppercase text-text-sub dark:text-gray-400 tracking-widest flex items-center gap-1.5">
                  <School size={14} /> {product.department.name}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-[1.1] mb-6 tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-primary">
                  ₹{product.price}
                </span>
                <span className="text-xl text-gray-400 line-through font-bold">
                  ₹{product.originalPrice}
                </span>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wide">
                Save {product.discount}%
              </span>
            </div>
          </div>

          <p className="text-text-sub dark:text-gray-300 leading-relaxed text-lg font-medium">
            {product.description} Official NIT Patna gear designed for students.
          </p>

          {!isLoggedIn ? (
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-primary text-white rounded-full">
                <LogIn size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black dark:text-white">
                  Sign in to Purchase
                </h3>
                <p className="text-sm text-text-sub dark:text-gray-400 mt-2">
                  Only verified NIT Patna students can buy official campus
                  merchandise.
                </p>
              </div>
              <Link
                to="/login"
                className="block w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02]"
              >
                Login to Shop
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {sizeVariants && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black uppercase tracking-widest dark:text-white">
                        Select Size
                      </span>
                      <button className="text-[10px] font-black text-primary flex items-center gap-1 hover:underline uppercase">
                        <Ruler size={14} /> Size Chart
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {sizeVariants.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-14 min-w-[64px] rounded-2xl text-sm font-black transition-all border-2 flex items-center justify-center ${
                            selectedSize === size
                              ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                              : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-text-main dark:text-gray-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <div className="flex gap-4 items-stretch">
                  <div className="flex items-center border-2 border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-card-dark h-16">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-full flex items-center justify-center text-text-sub hover:text-primary"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-10 text-center font-black text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-full flex items-center justify-center text-text-sub hover:text-primary"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl h-16 shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                  >
                    <ShoppingCart size={24} /> Add to Bag
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm font-black uppercase tracking-widest">
            <div className="flex items-center gap-3 text-text-sub">
              <Truck size={20} /> Campus Delivery
            </div>
            <div className="flex items-center gap-3 text-text-sub">
              <RotateCcw size={20} /> 48h Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
