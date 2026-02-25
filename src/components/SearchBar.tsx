// src/components/SearchBar.tsx
import React, { type KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** optional callback when user clicks Search or presses Enter */
  onSearch?: (currentValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "",
  onSearch,
}) => {
  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.(value);
    }
  }

  return (
    <div className="searchbar">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
      />
      <button
        className="search-btn"
        onClick={() => {
          onSearch?.(value);
        }}
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
