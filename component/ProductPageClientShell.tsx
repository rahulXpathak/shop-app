"use client"; // This component HAS to be a client component

import { useState } from "react";
import ProductHeader from "@/component/ProductHeader";
import FilterSidebar from "@/component/FilterSidebar";

// 1. Define props to accept children
interface ProductPageClientShellProps {
  children: React.ReactNode; // 'children' will be the <ProductGrid />
}

// 2. All your old logic from page.tsx is now in this file
const ProductPageClientShell: React.FC<ProductPageClientShellProps> = ({ children }) => {
  
  // All your state lives here
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <main>
      <ProductHeader
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      
      <div className="max-w-[1248px] mx-auto px-4">
        <div className="flex flex-nowrap gap-8">
          
          {/* Column 1: Filter Sidebar (Conditional) */}
          {isFilterOpen && <FilterSidebar />}

          {/* Column 2: Product Grid */}
          <div className="flex-1">
            {/* 3. Render the 'children' (your ProductGrid) here */}
            {children}
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductPageClientShell;