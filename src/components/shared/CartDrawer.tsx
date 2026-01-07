import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import type { RootState } from "../../redux/store";
import {
  setCartOpen,
  updateQuantity,
  removeItem,
} from "../../slices/cartSlice";

const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const handleCheckout = () => {
    dispatch(setCartOpen(false));
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-[#101622] shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ShoppingBag size={20} />
              </div>
              <h2 className="text-xl font-bold dark:text-white">
                Your Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={() => dispatch(setCartOpen(false))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-300">
                  <ShoppingBag size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white">
                    Your bag is empty
                  </h3>
                  <p className="text-text-sub text-sm max-w-[200px] mx-auto">
                    Looks like you haven't added any campus gear yet.
                  </p>
                </div>
                <button
                  onClick={() => dispatch(setCartOpen(false))}
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm dark:text-white pr-4">
                            {item.name}
                          </h4>
                          <button
                            onClick={() =>
                              dispatch(
                                removeItem({
                                  id: item.id,
                                  size: item.selectedSize,
                                })
                              )
                            }
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.selectedSize && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded uppercase text-text-sub">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.customName && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded uppercase text-primary">
                              Name: {item.customName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  delta: -1,
                                  size: item.selectedSize,
                                })
                              )
                            }
                            className="p-1 hover:text-primary transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  delta: 1,
                                  size: item.selectedSize,
                                })
                              )
                            }
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-primary">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-sub">
                  <span>Subtotal</span>
                  <span className="font-bold text-text-main dark:text-white">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-text-sub">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black pt-2 border-t border-gray-50 dark:border-gray-800">
                  <span className="dark:text-white">Total</span>
                  <span className="text-primary">₹{subtotal}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group transition-all"
              >
                Proceed to Checkout
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
