"use client";

import { useState } from 'react';
import { ChevronDown, ChevronLeft, Check } from 'lucide-react';
import styles from './ProductHeader.module.css'; 
import ProductMobileControls from './ProductMobileControls'; 

// Interface for a simple key-value filter object 
interface SelectedFilters {
  [key: string]: string[]; 
}

// Full Interface definition 
interface ProductHeaderProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
  selectedFilters: SelectedFilters;
  selectedSort: string; 
  onSortChange: (sortOption: string) => void; 
}

const ProductHeader: React.FC<ProductHeaderProps> = (props) => {
  
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    "RECOMMENDED",
    "NEWEST FIRST",
    "POPULAR",
    "PRICE : HIGH TO LOW",
    "PRICE : LOW TO HIGH",
  ];

  const activeFilterCount = props.selectedCategories.length + Object.keys(props.selectedFilters).length;

  return (
    <section className={styles.productHeaderSection}>
      <div className={styles.container}>
        
        {/* === MOBILE CONTROLS === */}
        <ProductMobileControls 
            isFilterOpen={props.isFilterOpen}
            setIsFilterOpen={props.setIsFilterOpen}
            selectedSort={props.selectedSort}
            onSortChange={props.onSortChange}
        />
        
        {/* === DESKTOP CONTROLS === */}
        <div className={styles.desktopControlsWrapper}>
            
            {/* Title Section (Desktop) */}
            <div className={styles.titleSection}>
                <h1 className={styles.titleHeading}>
                    DISCOVER OUR PRODUCTS
                </h1>
                <p className={styles.titleParagraph}>
                    Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
                    scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
                </p>
            </div>
            
            {/* Desktop Controls Bar */}
            <div className={styles.borderDiv}>
                <div className={styles.controlsBar}>
                    
                    {/* Left Section: Item Count & Filter Toggle */}
                    <div className={styles.leftSection}>
                        <span className={styles.itemCountText}>3425 ITEMS</span>
                        
                        <button 
                            onClick={() => props.setIsFilterOpen(!props.isFilterOpen)} 
                            className={styles.filterToggleButton}
                        >
                            <ChevronLeft 
                                size={16} 
                                strokeWidth={2}
                                className={`${styles.filterToggleChevron} ${props.isFilterOpen ? styles.chevronRotated : ''}`} 
                            />
                            <span className={styles.filterText}>
                                {props.isFilterOpen ? 'HIDE FILTER' : 'SHOW FILTER'}
                            </span>
                        </button>
                    </div>

                    {/* Right Section: Sort Dropdown */}
                    <div className={styles.sortDropdownContainer}>
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className={styles.sortToggleButton}
                        >
                            <span>{props.selectedSort}</span>
                            <ChevronDown 
                                size={16} 
                                strokeWidth={2.5} 
                                className={`${styles.sortChevron} ${isSortOpen ? styles.chevronRotated : ''}`}
                            />
                        </button>

                        {isSortOpen && (
                            <div className={styles.sortDropdownMenu}>
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            props.onSortChange(option);
                                            setIsSortOpen(false);
                                        }}
                                        className={`${styles.sortDropdownItem} ${props.selectedSort === option ? styles.sortDropdownItemActive : ''}`}
                                    >
                                        <span className={styles.sortDropdownCheck}>
                                            {props.selectedSort === option && <Check size={16} strokeWidth={2.5} />}
                                        </span>
                                        <span className={styles.sortDropdownOptionText}>
                                            {option}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div> 
      </div>
    </section>
  );
};

export default ProductHeader;
