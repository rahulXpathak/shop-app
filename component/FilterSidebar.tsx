"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// --- This is the mapping from your design to the API ---
const categoryMap: Record<string, string> = {
  "Men": "men's clothing",
  "Women": "women's clothing",
  "Jewelery": "jewelery", // The API uses this spelling
  "Electronics": "electronics",
};
// These are the names we'll show in the UI
const displayCategories = Object.keys(categoryMap); // ["Men", "Women", "Jewelery", "Electronics"]


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
  // Accordions start closed, except for "IDEAL FOR"
  const [isOpen, setIsOpen] = useState(title === "IDEAL FOR");

  // This function gets the display text (e.g., "Men")
  // and finds the API text (e.g., "men's clothing")
  const handleChange = (displayOption: string) => {
    const apiCategory = categoryMap[displayOption];
    if (apiCategory) {
      onCategoryChange(apiCategory);
    }
  };
  
  // This function clears only the "IDEAL FOR" filters
  const handleUnselectAll = () => {
    // We only call onClearFilters, which is now correct
    onClearFilters();
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold uppercase">{title}</span>
          {/* --- This shows "All" only when the accordion is CLOSED --- */}
          {!isOpen && (
            <span className="text-sm text-gray-500 mt-1">All</span>
          )}
        </div>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {/* --- This is the open content, matching your design --- */}
      {isOpen && (
        <div className="pb-5">
          <div className="flex justify-end mb-2">
            <button 
              onClick={handleUnselectAll}
              className="text-sm text-gray-500 hover:text-black underline"
            >
              Unselect all
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {options.map((option) => {
              const apiCategory = categoryMap[option];
              const isChecked = selectedCategories.includes(apiCategory);
              
              return (
                <label 
                  key={option} 
                  className="flex items-center gap-3 text-sm"
                >
                  <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleChange(option)}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="capitalize">{option}</span>
                </label>
              );
            })}
          </div>
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

  // These are the sections from your design
  // "IDEAL FOR" is now dynamic
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
    <aside className="w-72 py-8">
      {/* 1. Customizable Checkbox (static) */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-5">
        <input 
          type="checkbox" 
          id="customizable" 
          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
        />
        <label 
          htmlFor="customizable" 
          className="text-sm font-bold uppercase"
        >
          CUSTOMIZBLE
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