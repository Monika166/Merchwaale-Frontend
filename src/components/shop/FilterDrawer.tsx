
import React from 'react';
import { X, SlidersHorizontal, LayoutGrid, Check, ChevronDown, Tag } from 'lucide-react';
import { CATEGORIES, DEPARTMENTS } from '../../constants';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCatId: string;
  activeSubCatId: string;
  selectedDept: string[];
  setSearchParams: (params: any) => void;
  toggleDept: (id: string) => void;
  handleSubCatClick: (subId: string) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  activeCatId,
  activeSubCatId,
  selectedDept,
  setSearchParams,
  toggleDept,
  handleSubCatClick
}) => {
  const activeCategory = CATEGORIES.find(c => c.id === activeCatId);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-[101] w-full max-w-xs bg-white dark:bg-[#101622] shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6 overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black dark:text-white flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-primary" /> Filters
            </h2>
            <button 
              onClick={onClose}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-text-sub dark:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-text-sub flex items-center gap-2">
                <LayoutGrid size={16} className="text-primary" /> Collections
              </h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setSearchParams({}); onClose(); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeCatId === 'all' ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-gray-800 dark:text-gray-300'}`}
                >
                  Full Catalog
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { setSearchParams({ cat: cat.id }); }}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${activeCatId === cat.id ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-gray-800 dark:text-gray-300'}`}
                  >
                    {cat.name}
                    {activeCatId === cat.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {activeCategory && (
              <div className="space-y-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-text-sub flex items-center gap-2">
                  <ChevronDown size={16} className="text-primary" /> {activeCategory.name} Types
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {activeCategory.subCategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubCatClick(sub.id)}
                      className={`text-left px-4 py-3 rounded-xl text-[11px] font-bold transition-all border ${activeSubCatId === sub.id ? 'border-primary bg-primary/5 text-primary' : 'bg-gray-50 dark:bg-gray-800 border-transparent dark:text-gray-300'}`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pb-10">
              <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-text-sub flex items-center gap-2">
                <Tag size={16} className="text-primary" /> Faculty / Dept
              </h3>
              <div className="space-y-3">
                {DEPARTMENTS.map(dept => (
                  <label key={dept.id} className="flex items-center gap-4 cursor-pointer p-1">
                    <input 
                      type="checkbox" 
                      checked={selectedDept.includes(dept.id)}
                      onChange={() => toggleDept(dept.id)}
                      className="size-5 rounded border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-primary focus:ring-primary/20 transition-all" 
                    />
                    <span className={`text-sm font-bold transition-colors ${selectedDept.includes(dept.id) ? 'text-primary' : 'text-text-main dark:text-gray-300'}`}>
                      {dept.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 sticky bottom-0 bg-white dark:bg-[#101622] pb-2">
            <button 
              onClick={onClose}
              className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
