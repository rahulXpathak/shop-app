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
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
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

      <div
        style={{
          maxWidth: 1248,          
          marginLeft: "auto",       
          marginRight: "auto",      
          paddingLeft: "1rem",      
          paddingRight: "1rem",     
        }}
      >
        <div
          style={{
            display: "flex",       
            flexWrap: "nowrap",     
            gap: "2rem",            
          }}
        >
          {isFilterOpen && (
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          )}

          <div
            style={{
              flex: "1 1 0%",       
            }}
          >
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
