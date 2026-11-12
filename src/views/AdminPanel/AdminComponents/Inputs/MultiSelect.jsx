import React, { useState, useEffect, useRef } from "react";
import { PiCaretDownLight } from "react-icons/pi";
import { FaTimes, FaCheck } from "react-icons/fa";

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Normalize value to array of slugs
  const selectedSlugs = Array.isArray(value)
    ? value
    : typeof value === "string" && value.trim() !== ""
    ? value.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (slug) => {
    let updated;
    if (selectedSlugs.includes(slug)) {
      updated = selectedSlugs.filter((s) => s !== slug);
    } else {
      updated = [...selectedSlugs, slug];
    }
    if (onChange) {
      onChange(updated);
    }
  };

  const removeSlug = (e, slug) => {
    e.stopPropagation();
    const updated = selectedSlugs.filter((s) => s !== slug);
    if (onChange) {
      onChange(updated);
    }
  };

  const selectAll = (e) => {
    e.stopPropagation();
    const allSlugs = options.map((item) => item.slug);
    if (onChange) {
      onChange(allSlugs);
    }
  };

  const clearAll = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange([]);
    }
  };

  const filteredOptions = options.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Button / Display */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`min-h-[50px] w-full rounded border border-gray-300 bg-white p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"
        } ${isOpen ? "border-[#5DAABA] ring-1 ring-[#5DAABA]" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 pr-2">
          {selectedSlugs.length > 0 ? (
            selectedSlugs.map((slug) => {
              const matched = options.find((opt) => opt.slug === slug);
              const label = matched ? matched.title : slug;
              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1.5 bg-[#5DAABA] text-white text-xs font-medium px-2.5 py-1 rounded-md"
                >
                  <span>{label}</span>
                  <button
                    type="button"
                    onClick={(e) => removeSlug(e, slug)}
                    className="hover:opacity-75 focus:outline-none"
                    aria-label={`Remove ${label}`}
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </span>
              );
            })
          ) : (
            <span className="text-gray-400 text-base">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
          {selectedSlugs.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-red-500 font-medium px-1"
              title="Clear all"
            >
              Clear
            </button>
          )}
          <PiCaretDownLight
            className={`transition-transform duration-200 text-lg ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Search bar & quick actions */}
          <div className="p-2 border-b border-gray-200 flex flex-col gap-2 bg-gray-50">
            <input
              type="text"
              placeholder="Search property types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white outline-none focus:border-[#5DAABA]"
            />
            <div className="flex justify-between items-center text-xs text-gray-600 px-1">
              <span>
                {selectedSlugs.length} of {options.length} selected
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-[#5DAABA] hover:underline font-medium"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-red-500 hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => {
                const isSelected = selectedSlugs.includes(item.slug);
                return (
                  <div
                    key={item.id || item.slug}
                    onClick={() => toggleOption(item.slug)}
                    className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer text-sm transition-colors ${
                      isSelected
                        ? "bg-[#5DAABA]/10 text-[#2d6e7b] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center text-xs transition-colors ${
                          isSelected
                            ? "bg-[#5DAABA] border-[#5DAABA] text-white"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {isSelected && <FaCheck className="text-[9px]" />}
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {item.slug}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="p-3 text-center text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

