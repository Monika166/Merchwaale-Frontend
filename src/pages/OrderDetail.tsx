
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  Download, 
  MessageCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

const MOCK_ORDER_DETAIL = {
  id: 'NITP-ORD-10029',
  date: 'Oct 24, 2024, 02:45 PM',
  status: 'Delivered',
  total: 3299,
  subtotal: 3299,
  shipping: 0,
  paymentMethod: 'UPI / Google Pay',
  deliveryAddress: {
    label: 'Campus / Hostel',
    hostelName: 'Bhabha Hostel',
    roomNumber: '402-A'
  },
  items: [
    {
      id: 'hoodie-1',
      name: 'NIT Patna Signature Hoodie',
      price: 1299,
      quantity: 1,
      size: 'L',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'kit-lab-1',
      name: 'B.Tech Lab Essentials Pack',
      price: 1899,
      quantity: 1,
      size: 'XL',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306dca665?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'bottle-1',
      name: 'Insulated Campus Water Bottle',
      price: 101,
      quantity: 1,
      size: 'N/A',
      image: 'https://images.unsplash.com/photo-1602143399827-703f01427113?auto=format&fit=crop&q=80&w=200'
    }
  ],
  timeline: [
    { title: 'Order Placed', time: 'Oct 24, 02:45 PM', done: true, current: false },
    { title: 'Processing', time: 'Oct 24, 05:12 PM', done: true, current: false },
    { title: 'Out for Delivery', time: 'Oct 25, 10:30 AM', done: true, current: false },
    { title: 'Delivered to Hostel', time: 'Oct 25, 11:45 AM', done: true, current: true }
  ]
};

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/orders')}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-text-sub hover:text-primary transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black dark:text-white tracking-tight flex items-center gap-3">
              Order {orderId}
            </h1>
            <p className="text-xs font-bold text-text-sub dark:text-gray-400 mt-0.5">Placed on {MOCK_ORDER_DETAIL.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-800 text-text-main dark:text-white text-xs font-black rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700">
            <Download size={16} /> Download Invoice
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <MessageCircle size={16} /> Support
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Items & Progress */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Order Progress */}
          <section className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-black dark:text-white mb-8 flex items-center gap-2">
              <Truck className="text-primary" /> Delivery Progress
            </h3>
            
            <div className="relative pl-10 space-y-10">
              {/* Vertical Line */}
              <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gray-100 dark:bg-gray-800"></div>
              
              {MOCK_ORDER_DETAIL.timeline.map((step, i) => (
                <div key={i} className="relative">
                  {/* Step Dot */}
                  <div className={`absolute -left-[30px] top-1 size-5 rounded-full border-4 flex items-center justify-center transition-colors z-10 ${
                    step.done ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-card-dark border-gray-200 dark:border-gray-700'
                  }`}>
                    {step.done && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <p className={`font-black text-sm ${step.current ? 'text-primary' : step.done ? 'dark:text-white' : 'text-text-sub dark:text-gray-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-[10px] font-bold text-text-sub uppercase tracking-wider">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Items Summary */}
          <section className="bg-white dark:bg-card-dark rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-black dark:text-white flex items-center gap-2">
                <ShoppingBag className="text-primary" /> Order Items ({MOCK_ORDER_DETAIL.items.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {MOCK_ORDER_DETAIL.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="size-20 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-text-main dark:text-white group-hover:text-primary transition-colors">{item.name}</h4>
                      <p className="font-black text-primary">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <p className="text-[10px] font-black text-text-sub uppercase tracking-widest flex items-center gap-1">
                        Size: <span className="text-text-main dark:text-white">{item.size}</span>
                      </p>
                      <p className="text-[10px] font-black text-text-sub uppercase tracking-widest flex items-center gap-1">
                        Qty: <span className="text-text-main dark:text-white">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Address & Payments */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Summary Card */}
          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/10 dark:shadow-none space-y-6">
            <h3 className="text-xl font-black dark:text-white">Price Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-sub dark:text-gray-400 font-bold">Subtotal</span>
                <span className="font-black dark:text-white">₹{MOCK_ORDER_DETAIL.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-sub dark:text-gray-400 font-bold">Shipping Fee</span>
                <span className="text-green-600 font-black uppercase tracking-widest text-xs">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-sub dark:text-gray-400 font-bold">Campus Discount</span>
                <span className="text-green-600 font-black">-₹0</span>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="text-lg font-black dark:text-white">Paid Amount</span>
                <span className="text-2xl font-black text-primary">₹{MOCK_ORDER_DETAIL.total}</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-text-main dark:text-white text-sm font-black flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all">
                Buy Again <Package size={18} />
              </button>
            </div>
          </div>

          {/* Logistics Card */}
          <div className="bg-gray-50 dark:bg-gray-900/40 rounded-[2.5rem] p-8 space-y-8 border border-gray-100 dark:border-gray-800">
            {/* Delivery */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                <MapPin size={16} /> Delivery Location
              </div>
              <div>
                <h4 className="font-black dark:text-white">{MOCK_ORDER_DETAIL.deliveryAddress.label}</h4>
                <p className="text-sm text-text-sub dark:text-gray-400 font-medium mt-1 leading-relaxed">
                  {MOCK_ORDER_DETAIL.deliveryAddress.hostelName}, <br />
                  Room No: {MOCK_ORDER_DETAIL.deliveryAddress.roomNumber}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                <CreditCard size={16} /> Payment Method
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <ShieldCheck size={20} className="text-green-500" />
                </div>
                <p className="font-black text-sm dark:text-white">{MOCK_ORDER_DETAIL.paymentMethod}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-primary to-blue-700 rounded-[2rem] text-white shadow-xl shadow-primary/20">
             <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                   <CheckCircle2 size={24} />
                </div>
                <ExternalLink size={18} className="opacity-60" />
             </div>
             <h4 className="font-black text-lg">Verified Purchase</h4>
             <p className="text-xs text-blue-100 mt-2 leading-relaxed opacity-80">
               This order was placed using your verified NIT Patna Student ID. Loyalty points have been credited to your account.
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;
