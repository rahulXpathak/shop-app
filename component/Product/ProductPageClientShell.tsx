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
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
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

      <div className="pgc-container">
        <div className="pgc-row">
          {isFilterOpen && (
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              onClearFilters={onClearFilters}
            />
          )}

          <div className="pgc-content">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* max-w-[1248px] mx-auto px-4 */
        .pgc-container {
          max-width: 1248px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;   /* px-4 => 1rem */
          padding-right: 1rem;  /* px-4 => 1rem */
        }

        /* flex flex-nowrap gap-8 */
        .pgc-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 2rem; /* gap-8 => 2rem (32px) */
        }

        /* flex-1 */
        .pgc-content {
          flex: 1 1 0%;
        }
      `}</style>
    </main>
  );
};

export default ProductPageClientShell;
