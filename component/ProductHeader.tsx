"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';

interface ProductHeaderProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  isFilterOpen, 
  setIsFilterOpen 
}) => {
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("RECOMMENDED");

  const sortOptions = [
    "RECOMMENDED",
    "NEWEST FIRST",
    "POPULAR",
    "PRICE : HIGH TO LOW",
    "PRICE : LOW TO HIGH",
  ];

  return (
    <section className="w-full bg-white text-black">
      <div className="max-w-[1248px] mx-auto px-4">
        
        <div className="text-center py-16">
          <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-black">
            Discover Our Products
          </h1>
          <p className="mt-4 text-base text-zinc-700 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
          </p>
        </div>

        <div className="border-y border-gray-200">
          <div className="flex justify-between items-center py-4">
            
            <div>
              <span className="text-sm font-bold text-black">
                3425 ITEMS
              </span>
            </div>

            <div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black transition-colors"
              >
                {isFilterOpen ? (
                  <>
                    <ChevronLeft size={16} strokeWidth={3} />
                    <span>HIDE FILTER</span>
                  </>
                ) : (
                  <>
                    <ChevronRight size={16} strokeWidth={3} />
                    <span>SHOW FILTER</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 text-sm font-bold text-black"
              >
                <span>{selectedSort}</span>
                <ChevronDown size={16} strokeWidth={3} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setIsSortOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-100"
                    >
                      <span className="w-5">
                        {selectedSort === option && <Check size={16} strokeWidth={3} />}
                      </span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductHeader;