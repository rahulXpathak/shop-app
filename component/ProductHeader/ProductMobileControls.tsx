"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import styles from './ProductMobileControls.module.css'; 

interface ProductMobileControlsProps {
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
    selectedSort: string;
    onSortChange: (sortOption: string) => void; 
}

const ProductMobileControls: React.FC<ProductMobileControlsProps> = ({ 
    isFilterOpen, 
    setIsFilterOpen,
    selectedSort,
    onSortChange,
}) => {
    
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortOptions = [
        "RECOMMENDED",
        "NEWEST FIRST",
        "POPULAR",
        "PRICE : HIGH TO LOW",
        "PRICE : LOW TO HIGH",
    ];

    const handleSortChange = (option: string) => {
        onSortChange(option);
        setIsSortOpen(false);
    };
    
    return (
        <div className={styles.mobileControlsWrapper}>
            
            {/* Breadcrumb Section */}
            <div className={styles.breadcrumbBar}>
                <Link href="/" className={styles.breadcrumbLink}>HOME</Link>
                <span className={styles.breadcrumbSeparator}>|</span>
                <Link href="/shop" className={styles.breadcrumbLinkActive}>SHOP</Link>
            </div>

            {/* The Main Title Section */}
            <div className={styles.titleSection}>
                <h1 className={styles.titleHeading}>
                    DISCOVER OUR PRODUCTS
                </h1>
                <p className={styles.titleParagraph}>
                    Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
                    scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
                </p>
            </div>

            {/* Mobile Filter/Sort Bar */}
            <div className={styles.mobileControlBar}>
                
                {/* Left: Filter Button */}
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)} 
                    className={styles.mobileFilterButton}
                >
                    FILTER
                </button>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Right: Sort Dropdown */}
                <div className={styles.sortDropdownContainer}>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className={styles.mobileSortButton}
                    >
                        <span>{selectedSort}</span>
                        <ChevronDown 
                            size={16} 
                            strokeWidth={2.5}
                            className={`${styles.sortChevron} ${isSortOpen ? styles.chevronRotated : ''}`}
                        />
                    </button>
                </div>
                
            </div>

            {/* Dropdown Menu - OUTSIDE the control bar */}
            {isSortOpen && (
                <div className={styles.sortDropdownMenu}>
                    {sortOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSortChange(option)}
                            className={`${styles.sortDropdownItem} ${selectedSort === option ? styles.sortDropdownItemActive : ''}`}
                        >
                            <span className={styles.sortDropdownCheck}>
                                {selectedSort === option && <Check size={16} strokeWidth={2.5} />}
                            </span>
                            <span className={styles.sortDropdownOptionText}>
                                {option}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductMobileControls;
