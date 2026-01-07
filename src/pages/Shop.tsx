
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Check, ChevronRight, LayoutGrid, Tag } from 'lucide-react';
import { PRODUCTS, CATEGORIES, DEPARTMENTS } from '../constants';
import ProductCard from '../components/shared/ProductCard';
import FilterDrawer from '../components/shop/FilterDrawer';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDept, setSelectedDept] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const activeCatId = searchParams.get('cat') || 'all';
  const activeSubCatId = searchParams.get('sub') || 'all';

  const activeCategory = CATEGORIES.find(c => c.id === activeCatId);

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = activeCatId === 'all' || p.category === activeCatId;
    const matchesSub = activeSubCatId === 'all' || p.subCategory === activeSubCatId;
    const matchesDept = selectedDept.length === 0 || (p.department && selectedDept.includes(p.department.id));
    return matchesCat && matchesSub && matchesDept;
  });

  const toggleDept = (id: string) => {
    setSelectedDept(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleSubCatClick = (subId: string) => {
    if (subId === activeSubCatId) {
      searchParams.delete('sub');
    } else {
      searchParams.set('sub', subId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full relative">
      <FilterDrawer 
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        activeCatId={activeCatId}
        activeSubCatId={activeSubCatId}
        selectedDept={selectedDept}
        setSearchParams={setSearchParams}
        toggleDept={toggleDept}
        handleSubCatClick={handleSubCatClick}
      />

      {/* Streamlined Navigation Header (Compact) */}
      <div className="bg-white dark:bg-[#0d121b] border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-14 flex items-center justify-between gap-4">
          <nav className="flex text-[10px] font-black uppercase tracking-[0.2em] text-text-sub items-center gap-2 overflow-hidden whitespace-nowrap">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight size={10} className="shrink-0" />
            <button onClick={() => setSearchParams({})} className={`hover:text-primary transition-colors ${activeCatId === 'all' ? 'text-primary' : ''}`}>Shop</button>
            {activeCategory && (
              <>
                <ChevronRight size={10} className="shrink-0" />
                <span className="text-text-main dark:text-white truncate">{activeCategory.name}</span>
              </>
            )}
            {activeSubCatId !== 'all' && (
              <>
                <ChevronRight size={10} className="shrink-0" />
                <span className="text-primary truncate">{activeCategory?.subCategories.find(s => s.id === activeSubCatId)?.name}</span>
              </>
            )}
          </nav>

          {/* Quick Sub-Category Chips - Desktop only in header for compactness */}
          {activeCategory && (
            <div className="hidden md:flex gap-1.5 overflow-x-auto scrollbar-hide py-1">
              {activeCategory.subCategories.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => handleSubCatClick(sub.id)}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all border shrink-0 ${activeSubCatId === sub.id ? 'bg-primary border-primary text-white shadow-sm' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-text-sub hover:border-primary/50'}`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6 flex flex-col lg:flex-row gap-10">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-10">
          {/* Category Tree */}
          <div className="space-y-6">
            <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-text-sub mb-4 flex items-center gap-2">
              <LayoutGrid size={16} className="text-primary" /> Collections
            </h3>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => setSearchParams({})}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCatId === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-gray-300'}`}
              >
                Full Catalog
              </button>
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="space-y-1">
                  <button 
                    onClick={() => setSearchParams({ cat: cat.id })}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${activeCatId === cat.id ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-gray-300'}`}
                  >
                    {cat.name}
                    {activeCatId === cat.id && <Check size={14} />}
                  </button>
                  {activeCatId === cat.id && (
                    <div className="pl-4 py-1 flex flex-col gap-1 border-l-2 border-primary/10 ml-4 mt-1 animate-in slide-in-from-left-2 duration-300">
                      {cat.subCategories.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubCatClick(sub.id)}
                          className={`text-left px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${activeSubCatId === sub.id ? 'text-primary bg-primary/5' : 'text-text-sub hover:text-text-main dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-text-sub mb-6 flex items-center gap-2">
              <Tag size={16} className="text-primary" /> Faculty / Dept
            </h3>
            <div className="space-y-3">
              {DEPARTMENTS.map(dept => (
                <label key={dept.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedDept.includes(dept.id)}
                    onChange={() => toggleDept(dept.id)}
                    className="size-4 rounded border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary focus:ring-primary/20 transition-all cursor-pointer" 
                  />
                  <span className={`text-xs font-bold transition-colors ${selectedDept.includes(dept.id) ? 'text-primary' : 'text-text-main dark:text-gray-300 group-hover:text-primary'}`}>
                    {dept.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 space-y-6">
          {/* Active Title and Stats (Simplified) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-50 dark:border-gray-800/50">
             <div>
                <h2 className="text-xl font-black text-text-main dark:text-white tracking-tight flex items-center gap-2">
                  {activeCategory ? activeCategory.name : 'Store'}
                  {activeSubCatId !== 'all' && (
                    <>
                      <ChevronRight size={14} className="text-gray-300" />
                      <span className="text-primary">{activeCategory?.subCategories.find(s => s.id === activeSubCatId)?.name}</span>
                    </>
                  )}
                </h2>
                <p className="text-[10px] text-text-sub dark:text-gray-400 font-black uppercase tracking-widest mt-1">
                  <span className="text-text-main dark:text-white">{filteredProducts.length}</span> Products Found
                </p>
             </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20"
              >
                <Filter size={14} /> Filters
              </button>
              <div className="relative">
                <select className="pl-3 pr-8 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black appearance-none cursor-pointer focus:ring-primary focus:border-primary dark:text-white uppercase tracking-widest">
                  <option>New Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Stock Level</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3 pointer-events-none text-text-sub" />
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="size-16 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mx-auto text-text-sub/30">
                <LayoutGrid size={32} />
              </div>
              <div>
                <h3 className="text-lg font-black dark:text-white">No items found</h3>
                <p className="text-[11px] text-text-sub dark:text-gray-400 mt-1 uppercase tracking-wider">Try clearing filters</p>
              </div>
              <button onClick={() => { setSearchParams({}); setSelectedDept([]); }} className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg shadow-primary/20 transition-transform">Reset All</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
