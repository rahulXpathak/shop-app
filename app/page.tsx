"use client";

import { useState } from "react";
import ProductHeader from "@/component/ProductHeader";
import FilterSidebar from "@/component/FilterSidebar";
import ProductGrid from "@/component/ProductGrid";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleFilterChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Uncheck it
        : [...prev, category] // Check it
    );
  };

  // --- NEW FUNCTION ---
  // This function clears all selected filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
  };
  // --------------------

  return (
    <div>
      <ProductHeader
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      
      <div className="max-w-[1248px] mx-auto px-4">
        <div className="flex flex-nowrap gap-8">
          
          {isFilterOpen && (
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleFilterChange}
              onClearFilters={handleClearFilters} // Pass the new function
            />
          )}

          <div className="flex-1">
            <ProductGrid selectedCategories={selectedCategories} />
          </div>

        </div>
      </div>
    </div>
  );
}