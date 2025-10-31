"use client"; // This component must be "use client" to use hooks

import { useState, useEffect, useMemo } from 'react';
import ProductCard from "@/component/Product/ProductCard";
import "./ProductGrid.css"; // <-- plain CSS extracted

// Define a type for the product from the API
interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  // Note: API returns 'rating' object which includes 'rate'
  rating: {
      rate: number;
      count: number;
  };
}

// 1. Define props for the component - NOW INCLUDING selectedSort
interface ProductGridProps {
  selectedCategories: string[];
  selectedSort: string; // <-- ADDED TO FIX PREVIOUS ERROR
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategories, selectedSort }) => {
  // 2. State to hold ALL products from the API
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch all products, including the rating data needed for sorting
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ApiProduct[] = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty array means this runs only once

  // 4. Filter the products whenever selectedCategories changes
  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allProducts;
    }
    return allProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }, [allProducts, selectedCategories]); // Re-run when these change

  // --- 5. Sort the products whenever the filter changes or selectedSort changes ---
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts]; // Create a copy to sort
    
    // Simple comparison function for sorting products
    const sortComparer = (a: ApiProduct, b: ApiProduct): number => {
      switch (selectedSort) {
        case "PRICE : LOW TO HIGH":
          return a.price - b.price;
        case "PRICE : HIGH TO LOW":
          return b.price - a.price;
        case "POPULAR":
          // Assuming 'rate' in the rating object determines popularity
          return b.rating.rate - a.rating.rate;
        case "NEWEST FIRST":
          // The fakestoreapi doesn't have a reliable 'date' field,
          // but we can simulate 'newest' by reversing the default ID order.
          // For a real API, you would sort by 'createdAt' descending.
          return b.id - a.id; 
        case "RECOMMENDED":
        default:
          // Default sort (usually by ID/initial fetch order)
          return 0; 
      }
    };

    // Note: Array.prototype.sort() mutates the array in place, which is why we 
    // copied the array first with [...filteredProducts].
    return productsToSort.sort(sortComparer);
  }, [filteredProducts, selectedSort]); // Re-run when filtered list or sort option changes

  if (isLoading) {
    return <p className="pg-loading">Loading products...</p>;
  }

  // Display a message if no products match the criteria
  if (sortedProducts.length === 0) {
      return (
          <p className="pg-empty">
              No products match the selected filters or categories.
          </p>
      );
  }

  return (
    <div className="pg-wrap">
      <h2 className="pg-heading">
        {selectedCategories.length > 0 ? selectedCategories.join(', ').toUpperCase() : 'ALL'} Products
      </h2>
      <div className="pg-grid">
        {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              id: product.id.toString(),
              imageUrl: product.image,
              title: product.title,
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
