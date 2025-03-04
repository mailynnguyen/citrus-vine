import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import "@/styles/search-bar.css"

// Still need to set up web and data server to implement the search logic and search results.
const SearchBar = () => {
    return (
        <form className='search-form'>
            <div className="search-container">
                <input
                    type="search"
                    placeholder='Type Here'
                    className='search-input'
                />
                <button className='search-button'>
                    <AiOutlineSearch className='search-icon'/>
                </button>
                {/* <div className='search-results'> */}
                {/* </div> */}
            </div>
        </form>
    )
}

export default SearchBar;