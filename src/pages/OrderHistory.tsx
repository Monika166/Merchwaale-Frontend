
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ChevronRight, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'NITP-ORD-10029',
    date: 'Oct 24, 2024',
    total: 3299,
    status: 'Delivered',
    items: 3,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'NITP-ORD-10142',
    date: 'Nov 02, 2024',
    total: 1299,
    status: 'In Transit',
    items: 1,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'NITP-ORD-10255',
    date: 'Nov 12, 2024',
    total: 4599,
    status: 'Processing',
    items: 4,
    image: 'https://images.unsplash.com/photo-1536633396567-9d480a490420?auto=format&fit=crop&q=80&w=200'
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Delivered': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'In Transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Processing': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Cancelled': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const icons: Record<string, React.ReactNode> = {
    'Delivered': <CheckCircle2 size={14} />,
    'In Transit': <Truck size={14} />,
    'Processing': <Clock size={14} />,
    'Cancelled': <AlertCircle size={14} />,
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${styles[status] || styles['Processing']}`}>
      {icons[status]} {status}
    </span>
  );
};

const OrderHistory: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black dark:text-white tracking-tight">Order History</h1>
          <p className="text-text-sub dark:text-gray-400 mt-1 font-medium">Manage and track all your campus gear orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-sub" />
            <input 
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 placeholder:text-text-sub dark:text-white"
              placeholder="Search Order ID..." 
            />
          </div>
          <button className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-text-sub hover:text-primary transition-colors border border-transparent hover:border-primary/20">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
             <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Package size={40} />
             </div>
             <h3 className="text-xl font-black dark:text-white">No orders yet</h3>
             <p className="text-text-sub dark:text-gray-400 max-w-xs mx-auto">Looks like you haven't started your campus collection. Ready to browse?</p>
             <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold">Start Shopping</Link>
          </div>
        ) : (
          MOCK_ORDERS.map((order) => (
            <div 
              key={order.id} 
              className="bg-white dark:bg-card-dark rounded-[2rem] p-5 md:p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="size-24 rounded-2xl bg-gray-50 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                  <img src={order.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black dark:text-white tracking-tight">{order.id}</h3>
                      <p className="text-xs font-bold text-text-sub dark:text-gray-400 flex items-center gap-2">
                        Placed on {order.date} <span className="text-gray-300">|</span> {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[10px] font-black text-text-sub uppercase tracking-widest mb-0.5">Total Amount</p>
                      <p className="text-xl font-black text-primary">₹{order.total}</p>
                    </div>
                    <Link 
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-800 text-text-main dark:text-white text-xs font-black rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      View Details <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="size-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Clock size={28} />
            </div>
            <div>
              <h4 className="text-lg font-black dark:text-white">Need support for an older order?</h4>
              <p className="text-sm text-text-sub dark:text-gray-400 font-medium">Our campus support team is available 10AM - 6PM at the Student Activity Center.</p>
            </div>
         </div>
         <button className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl text-primary dark:text-white font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            Contact Support <ArrowRight size={18} />
         </button>
      </div>
    </div>
  );
};

export default OrderHistory;
