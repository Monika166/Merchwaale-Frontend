import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Plus, Minus, LogIn } from "lucide-react";
import type { Product } from "../../types";
import type { RootState } from "../../redux/store";
import { addItem, updateQuantity } from "../../slices/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const isOutOfStock = product.stock <= 0;
  const cartItem = cart.find(
    (item) => item.id === product.id && item.selectedSize === "L"
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!isOutOfStock && !cartItem) {
      dispatch(addItem({ product, quantity: 1, size: "L" }));
    }
  };

  const handleAdjustQuantity = (e: React.MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, delta, size: "L" }));
  };

  return (
    <div
      className={`group bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/50 rounded-[2rem] p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative ${
        isOutOfStock ? "opacity-75 grayscale-[0.3]" : ""
      }`}
    >
      <Link
        to={`/product/${product.id}`}
        className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-[1.5rem] overflow-hidden relative mb-5"
      >
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isCustomizable && !isOutOfStock && (
            <span className="bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1">
              Customizable
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-gray-800 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
              Sold Out
            </span>
          )}
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
            <span className="bg-white/90 text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-[0.1em]">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-1">
        <Link
          to={`/product/${product.id}`}
          className={`font-black text-base text-text-main dark:text-white leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
            isOutOfStock ? "text-gray-400" : ""
          }`}
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-xl font-black ${
              isOutOfStock ? "text-gray-400" : "text-primary"
            }`}
          >
            ₹{product.price}
          </span>
          <span className="text-xs text-text-sub dark:text-gray-500 line-through font-bold">
            ₹{product.originalPrice}
          </span>
          <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-tight">
            ({product.discount}% OFF)
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-text-sub dark:text-gray-500 uppercase tracking-widest">
              Limited Edition
            </span>
          </div>

          {!isLoggedIn ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-text-main dark:text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <LogIn size={14} /> Login to Shop
            </button>
          ) : cartItem ? (
            <div className="flex items-center bg-primary text-white rounded-2xl p-1 shadow-lg shadow-primary/20 animate-in zoom-in duration-300">
              <button
                onClick={(e) => handleAdjustQuantity(e, -1)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-black text-sm">
                {cartItem.quantity}
              </span>
              <button
                onClick={(e) => handleAdjustQuantity(e, 1)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`size-12 rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-90 ${
                isOutOfStock
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-300 cursor-not-allowed"
                  : "bg-gray-50 dark:bg-gray-800 text-text-main dark:text-white hover:bg-primary hover:text-white"
              }`}
            >
              <ShoppingCart size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
