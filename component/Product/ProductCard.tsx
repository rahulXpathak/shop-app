"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    title: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className={styles.card}>
      
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={300}
            height={399}
            className={styles.image}
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className={styles.details}>
        {/* Product Title */}
        <h3 className={styles.title}>
          <Link href={`/product/${product.id}`} className={styles.titleLink}>
            {product.title}
          </Link>
        </h3>

        {/* Login Info & Wishlist */}
        <div className={styles.footer}>
          <p className={styles.loginInfo}>
            <Link href="/signin" className={styles.loginLink}>
              Sign in
            </Link>{" "}
            or{" "}
            <Link href="/signup" className={styles.loginLink}>
              Create an account
            </Link>{" "}
            to see pricing
          </p>

          <button 
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleWishlistClick}
            className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
          >
            <Heart 
              size={24} 
              strokeWidth={1.5}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
