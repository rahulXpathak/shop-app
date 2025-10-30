"use client";

import { useState } from "react";
import ProductHeader from "@/component/ProductHeader/ProductHeader";
import FilterSidebar from "@/component/Filter/FilterSidebar";

interface ProductPageClientShellProps {
  children: React.ReactNode;
}

interface SelectedFilters {
  [key: string]: string[]; 
}

const ProductPageClientShell: React.FC<ProductPageClientShellProps> = ({ children }) => {
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [selectedSort, setSelectedSort] = useState<string>("RECOMMENDED");

  const onCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const onClearFilters = () => {
    setSelectedCategories([]);
    setSelectedFilters({});
  };

  const onSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  return (
    <main>
      <ProductHeader
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
        onClearFilters={onClearFilters}
        selectedFilters={selectedFilters}
        selectedSort={selectedSort}
        onSortChange={onSortChange}
      />
      
      <div className="max-w-[1248px] mx-auto px-4">
        <div className="flex flex-nowrap gap-8">
          
          {isFilterOpen && (
            <FilterSidebar 
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              onClearFilters={onClearFilters}
            />
          )}

          <div className="flex-1">
            {children}
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductPageClientShell;
