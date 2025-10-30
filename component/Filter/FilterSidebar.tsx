"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FilterSidebar.module.css';

// --- This is the mapping from your design to the API ---
const categoryMap: Record<string, string> = {
  "Men": "men's clothing",
  "Women": "women's clothing",
  "Baby & Kids": "jewelery", // Using available API category
};

// These are the names we'll show in the UI
const displayCategories = Object.keys(categoryMap);

// --- Accordion Item Component ---
const FilterAccordionItem = ({
  title,
  options,
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}: {
  title: string;
  options: string[];
  selectedCategories: string[];
  onCategoryChange: (apiCategory: string) => void;
  onClearFilters: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(title === "IDEAL FOR");

  const handleChange = (displayOption: string) => {
    const apiCategory = categoryMap[displayOption];
    if (apiCategory) {
      onCategoryChange(apiCategory);
    }
  };
  
  const handleUnselectAll = () => {
    onClearFilters();
  };

  return (
    <div className={styles.accordionItem}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.accordionHeader}
      >
        <div className={styles.accordionTitleWrapper}>
          <span className={styles.accordionTitle}>{title}</span>
          {!isOpen && (
            <span className={styles.accordionSubtitle}>All</span>
          )}
        </div>
        <ChevronDown 
          size={16} 
          strokeWidth={2}
          className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconRotated : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className={styles.accordionContent}>
          {options.length > 0 && (
            <>
              <div className={styles.unselectAllWrapper}>
                <button 
                  onClick={handleUnselectAll}
                  className={styles.unselectAllButton}
                >
                  Unselect all
                </button>
              </div>

              <div className={styles.optionsList}>
                {options.map((option) => {
                  const apiCategory = categoryMap[option];
                  const isChecked = selectedCategories.includes(apiCategory);
                  
                  return (
                    <label 
                      key={option} 
                      className={styles.optionLabel}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleChange(option)}
                        className={styles.checkbox}
                      />
                      <span className={styles.optionText}>{option}</span>
                    </label>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// --- Main Sidebar Component ---
const FilterSidebar = ({
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}: {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}) => {

  const staticSections = [
    { title: "OCCASION", options: [] },
    { title: "WORK", options: [] },
    { title: "FABRIC", options: [] },
    { title: "SEGMENT", options: [] },
    { title: "SUITABLE FOR", options: [] },
    { title: "RAW MATERIALS", options: [] },
    { title: "PATTERN", options: [] },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Customizable Checkbox */}
      <div className={styles.customizableWrapper}>
        <input 
          type="checkbox" 
          id="customizable" 
          className={styles.checkbox}
        />
        <label 
          htmlFor="customizable" 
          className={styles.customizableLabel}
        >
          CUSTOMIZABLE
        </label>
      </div>

      <div>
        {/* The dynamic "IDEAL FOR" section */}
        <FilterAccordionItem
          title="IDEAL FOR"
          options={displayCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          onClearFilters={onClearFilters}
        />
        
        {/* The other static sections */}
        {staticSections.map((section) => (
          <FilterAccordionItem 
            key={section.title} 
            title={section.title}
            options={section.options}
            selectedCategories={[]}
            onCategoryChange={() => {}}
            onClearFilters={() => {}}
          />
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
