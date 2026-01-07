
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Palette, 
  Edit3, 
  ChevronRight, 
  Upload, 
  Shirt, 
  RotateCcw,
  ShoppingCart,
  Bookmark,
  ChevronDown,
  Package
} from 'lucide-react';
import { PRODUCTS } from '../constants';
import { addItem } from '../slices/cartSlice';

const Customise: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: 'ARYAN',
    department: 'Computer Science (CSE)',
    batch: '2026',
    placement: 'Back Top',
    color: 'Navy Blue'
  });

  const colors = [
    { name: 'Navy Blue', hex: '#1a2b4b' },
    { name: 'Black', hex: '#000000' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Maroon', hex: '#800000' }
  ];

  const handleAddToCart = () => {
    const product = PRODUCTS[0]; 
    const customDescription = `${formData.department} | Batch ${formData.batch}`;
    dispatch(addItem({ 
      product: { ...product, description: customDescription }, 
      quantity: 1, 
      size: 'L', 
      customName: formData.name 
    }));
  };

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-text-sub dark:text-gray-400">
          <a href="/" className="hover:text-primary">Home</a>
          <ChevronRight size={14} />
          <a href="/shop" className="hover:text-primary">Shop</a>
          <ChevronRight size={14} />
          <span className="text-text-main dark:text-white font-medium">Customise Your Merch</span>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-black text-text-main dark:text-white tracking-tight mb-2">Customise Your Merch</h1>
          <p className="text-text-sub dark:text-gray-400 text-lg">Add your name, department, batch, and logo — preview instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold dark:text-white">Templates & Quick Picks</h3>
                <button className="text-sm text-primary font-bold hover:underline">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {[
                  { title: 'CSE 2026', sub: 'Classic Dept Print', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMHPVWDoOiq6W7-yb6aQmtg7_PIVR7SJg01qS3IM-7nUL50xYN51Fai4u7WfsZJGJSAP19H7TmVmu3MufPi84tGADvUlFP4aJ3XFBeaAI8ZoPhKKfTBbTTkOHDgUf6gkiT70KqEBdvtMJWGW7vakzhd7FWBNR34yrRtNmqSdxp5SQ2NxNZIj917w09ser6bmpIy9Sr6-RgdHnRhRjOpDKxH81GuTX3KcItikuxN9tVAzl5iOocf4D6VdxWdYp3A2KgybGsAP4FRFZ' },
                  { title: 'Robotics Club', sub: 'Official Merch', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTNDDr4RFymDerFitQ6XKJwZhSULZ470xAEw1tsAa6ek2fR49k5jdv6DrymGOxcPlMDI54pKDaNwmpRFQS7F81lXZbTbfsBCh3kTqGCiI7JFGwLQz05aEQFlVCOfQn-qALeSsl5sB2Gftz-JRUU6VI13PGC1OEAgcElhG1N5LjVPB7DQ4NVexjflU-cVV3MOFWV4ewClw77hBOGc1sX0JhsOL_Ap7WDlChp5re75gJyDnRUUn5qK9gHdT57ivldItwGcd6WW5w1RNA' },
                  { title: 'Alumni Assoc.', sub: 'Official Crest', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfBZp3OjYMq58HlMQMMII-TGTQ9EhBvqTQ2lPXxSxnheubuKp3QTc0WYWPXla_91PDiCss67SYdzRaOIz_tpoVTV-W4xCoZB_0VDraR4n1KycTxvvWqA6fq2JmmgQ-Z8U9unXPaNW5PkTDtpAZoIcL8MhSdA1ncTwEkPW6HvooEPVKNpml9iYu2_V3ZDNlD1VbyWZfi7-XtJtKZMeEWZxvm4XlcJodo3fFTZPDbF3egpyeHeoJ5uacPw-sn7YHufTCoQkriQGF_UYO' }
                ].map((tpl, i) => (
                  <button key={i} className={`flex-none w-48 group text-left transition-all ${i === 0 ? 'scale-105' : 'opacity-80'}`}>
                    <div className={`aspect-[4/3] rounded-2xl overflow-hidden mb-3 border-2 ${i === 0 ? 'border-primary ring-4 ring-primary/10' : 'border-gray-200 dark:border-gray-700'}`}>
                      <img src={tpl.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm font-bold dark:text-white">{tpl.title}</p>
                    <p className="text-xs text-text-sub dark:text-gray-400">{tpl.sub}</p>
                  </button>
                ))}
              </div>
            </section>

            <div className="bg-white dark:bg-card-dark rounded-3xl p-6 lg:p-8 border border-blue-100 dark:border-gray-800 shadow-sm space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 font-black dark:text-white">
                  <Palette className="text-primary" /> <span>Style Options</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-sub dark:text-gray-400">Color</label>
                    <div className="flex gap-3">
                      {colors.map(c => (
                        <button 
                          key={c.name}
                          onClick={() => setFormData({...formData, color: c.name})}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${formData.color === c.name ? 'border-primary scale-110 ring-4 ring-primary/10' : 'border-transparent'}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-bold dark:text-gray-300">Selected: {formData.color}</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-text-sub dark:text-gray-400">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {['S','M','L','XL','XXL'].map(s => (
                        <button key={s} className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all ${s === 'L' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 hover:border-primary'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />

              <div className="space-y-6">
                <div className="flex items-center gap-2 font-black dark:text-white">
                  <Edit3 className="text-primary" /> <span>Text Personalisation</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase">Display Name (Back)</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#f8f9fc] dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-main dark:text-white rounded-xl px-4 py-3 text-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase">Department</label>
                    <select 
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full bg-[#f8f9fc] dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-main dark:text-white rounded-xl px-4 py-3 text-sm appearance-none focus:ring-primary focus:border-primary"
                    >
                      <option>Computer Science (CSE)</option>
                      <option>Electronics (ECE)</option>
                      <option>Mechanical (ME)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-[42px] size-4 text-text-sub pointer-events-none" />
                  </div>
                  <div className="space-y-1.5 relative">
                    <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase">Batch Year</label>
                    <select className="w-full bg-[#f8f9fc] dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-main dark:text-white rounded-xl px-4 py-3 text-sm appearance-none">
                      <option>2024</option>
                      <option>2025</option>
                      <option selected>2026</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-[42px] size-4 text-text-sub pointer-events-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase">Placement</label>
                    <div className="flex gap-2 p-1 bg-[#f8f9fc] dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      {['Back Top', 'Chest', 'Sleeve'].map(p => (
                        <button 
                          key={p}
                          onClick={() => setFormData({...formData, placement: p})}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${formData.placement === p ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-text-sub dark:text-gray-400 hover:text-primary'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />

              <div className="space-y-6">
                <div className="flex items-center gap-2 font-black dark:text-white">
                  <Upload className="text-primary" /> <span>Logo & Graphics</span>
                </div>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                  <Upload className="size-10 text-text-sub group-hover:text-primary mb-3" />
                  <p className="font-bold dark:text-white">Click to upload logo</p>
                  <p className="text-xs text-text-sub dark:text-gray-400 mt-1">SVG, PNG or JPG (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start">
               <Package className="text-primary mt-1" />
               <div className="flex-1">
                 <h4 className="font-bold text-sm dark:text-white">Save 10% with a Starter Pack</h4>
                 <p className="text-sm text-text-sub dark:text-gray-400">Bundle this hoodie with a custom T-shirt and Cap. Perfect for freshers!</p>
                 <button className="text-primary text-sm font-bold mt-2 hover:underline">View Bundle Offer</button>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#f6f6f8] dark:bg-gray-900 border-2 border-primary/10 rounded-3xl overflow-hidden shadow-xl aspect-square flex items-center justify-center p-12 relative group">
                <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs font-black dark:text-white">
                  <span className={`size-2 rounded-full ${formData.color === 'Navy Blue' ? 'bg-[#1a2b4b]' : formData.color === 'Black' ? 'bg-black' : 'bg-gray-400'}`}></span>
                  Preview: Hoodie – {formData.color}
                </div>
                
                <div className="relative w-full h-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <img src={PRODUCTS[0].image} className="w-full h-full object-contain" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none drop-shadow-lg">
                    <p className="text-white font-black text-3xl tracking-widest">{formData.name}</p>
                    <p className="text-white font-bold text-sm mt-1 opacity-80">{formData.batch}</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/80 backdrop-blur rounded-xl border border-gray-100 dark:border-gray-700 p-1.5 flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-sub transition-colors"><RotateCcw size={18} /></button>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-text-sub transition-colors"><Shirt size={18} /></button>
                </div>
              </div>

              <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">₹1,299</h3>
                    <p className="text-xs text-text-sub dark:text-gray-400 font-bold">Inclusive of all taxes</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded">IN STOCK</span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-text-sub dark:text-gray-400">
                    <span>Base Price</span>
                    <span className="font-bold text-text-main dark:text-white">₹999</span>
                  </div>
                  <div className="flex justify-between text-text-sub dark:text-gray-400">
                    <span>Customisation</span>
                    <span className="font-bold text-text-main dark:text-white">+ ₹300</span>
                  </div>
                  <hr className="border-dashed border-gray-200 dark:border-gray-800" />
                  <div className="flex justify-between font-black text-lg">
                    <span className="dark:text-white">Total</span>
                    <span className="text-primary">₹1,299</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="bg-primary hover:bg-primary-dark text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-main dark:text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                    <Bookmark size={20} className="text-primary" /> Save Design
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customise;
