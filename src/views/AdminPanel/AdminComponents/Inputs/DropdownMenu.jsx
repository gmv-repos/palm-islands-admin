import React, { useState, useEffect, useRef } from "react";
// import { FixedSizeList as List } from "react-window";
import { PiCaretDownLight } from "react-icons/pi";

const DropdownMenu = ({ innerBtns = [], onChange, value, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState(value || null);
  const [selectedName, setSelectedName] = useState("Select");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);


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

  // Update the selected name and active button when value or innerBtns change
  useEffect(() => {
    const selectedOption = innerBtns.find((btn) => btn.id == value);
    if (selectedOption) {
      setSelectedName(selectedOption.name);
      setActiveBtn(selectedOption.id);
    } else {
      setSelectedName("Select");
      setActiveBtn(null);
    }
  }, [value, innerBtns]);

const handleSelect = (item) => {
  setActiveBtn(item.id);
  setSelectedName(item.name);
  setIsOpen(false);
  if (onChange) {
    onChange(item); // Pass selected object back to parent
  }
};


  const filteredBtns = innerBtns.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative inline-block md:text-md text-sm text-left min-w-full">
      {/* Dropdown Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        type="button"
        className="flex justify-between items-center px-4 py-2 w-full border border-[#DFDFDF] rounded-lg text-[#495057] bg-white"
        aria-expanded={isOpen} // Improved accessibility
      >
        {selectedName}
        <PiCaretDownLight
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-[#DFDFDF] rounded-lg z-50 max-h-52 overflow-auto">
          {/* Search Input */}
          <div className="px-4 py-2 border-b border-[#DFDFDF]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-[#DFDFDF] rounded-lg focus:outline-none "
            />
          </div>

          {/* Filtered Buttons */}
          {filteredBtns.length > 0 ? (
            filteredBtns.map((data) => (
              <button
                key={data.id}
                type="button"
                className={`block w-full text-left px-4 py-2 font-medium ${
                  activeBtn === data.id
                    ? "text-[#3997D8] bg-gray-100"
                    : "text-[#495057]"
                }`}
                onClick={() => handleSelect(data)}
              >
                {data.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
