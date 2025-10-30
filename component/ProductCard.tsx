import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    title: string;
    price?: number; 
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="w-full h-80 overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.title} // SEO: Using title as alt text
            width={350}
            height={320}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col items-start">
        {/* SEO: H3 tag for item title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-14">
          <Link href={`/product/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>

        {/* Pricing / Login Info */}
        <div className="mt-2 flex items-center justify-between w-full">
          {product.price ? (
            <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          ) : (
            <p className="text-sm text-gray-600">
              <Link href="/signin" className="underline hover:text-black">
                Sign in
              </Link>{" "}
              or{" "}
              <Link href="/signup" className="underline hover:text-black">
                Create an account
              </Link>{" "}
              to see pricing
            </p>
          )}

          <button 
            aria-label="Add to wishlist" 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;