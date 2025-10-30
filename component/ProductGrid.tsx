"use client"; // This component must be "use client" to use hooks

import { useState, useEffect, useMemo } from 'react';
import ProductCard from "@/component/ProductCard";

// Define a type for the product from the API
interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  // ...other fields
}

// 1. Define props for the component
interface ProductGridProps {
  selectedCategories: string[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategories }) => {
  
  // 2. State to hold ALL products from the API
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
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
    // If no categories are selected, show all products
    if (selectedCategories.length === 0) {
      return allProducts;
    }
    // Otherwise, filter by the selected categories
    return allProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }, [allProducts, selectedCategories]); // Re-run when these change

  if (isLoading) {
    return <p className="py-8">Loading products...</p>;
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Our Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              id: product.id.toString(),
              imageUrl: product.image,
              title: product.title,
              price: product.price,
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;