"use client";

import { useState } from "react";
import ProductHeader from "@/component/ProductHeader/ProductHeader";
import FilterSidebar from "@/component/Filter/FilterSidebar";
import ProductGrid from "@/component/Product/ProductGrid";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  
  const [selectedFilters] = useState({}); 
  
  
  const [selectedSort, setSelectedSort] = useState("RECOMMENDED");

  
  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) 
        : [...prev, category] // Check it
    );
  };

  
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSort("RECOMMENDED");
  };

  return (
    <div>
      <ProductHeader
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        
        
        selectedCategories={selectedCategories}
        onCategoryChange={handleFilterChange}
        onClearFilters={handleClearFilters} 
        selectedFilters={selectedFilters} 
        
        
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />
      
      <div className="max-w-[1248px] mx-auto px-4">
        <div className="flex flex-nowrap gap-8">
          
          {isFilterOpen && (
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          )}

          <div className="flex-1">
            <ProductGrid 
                selectedCategories={selectedCategories} 
                selectedSort={selectedSort}
            />
          </div>

        </div>
      </div>
    </div>
  );
}