"use client"; 

import { useState, useEffect, useMemo } from 'react';
import ProductCard from "@/component/Product/ProductCard";
import "./ProductGrid.css";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductGridProps {
  selectedCategories: string[];
  selectedSort: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategories, selectedSort }) => {
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
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
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allProducts;
    }
    return allProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }, [allProducts, selectedCategories]);

  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    
    const sortComparer = (a: ApiProduct, b: ApiProduct): number => {
      switch (selectedSort) {
        case "PRICE : LOW TO HIGH":
          return a.price - b.price;
        case "PRICE : HIGH TO LOW":
          return b.price - a.price;
        case "POPULAR":
          return b.rating.rate - a.rating.rate;
        case "NEWEST FIRST":
          return b.id - a.id; 
        case "RECOMMENDED":
        default:
          return 0; 
      }
    };

    return productsToSort.sort(sortComparer);
  }, [filteredProducts, selectedSort]);

  if (isLoading) {
    return <p className="pg-loading">Loading products...</p>;
  }

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