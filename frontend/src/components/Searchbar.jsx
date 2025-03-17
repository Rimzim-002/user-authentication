import React, { useState } from "react";
import { Search, X } from "lucide-react"; // Import icons
import "../Pages/styles/searchbar.css"; // Import custom CSS

function Searchbar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleClear = () => setSearchQuery(""); // Clears the input

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <Search size={20} className="search-icon" /> {/* Search Icon */}
                <input 
                    type="text"
                    className="search-input"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <X size={18} className="clear-icon" onClick={handleClear} /> /* Clear Icon */
                )}
            </div>
        </div>
    );
}

export default Searchbar;
