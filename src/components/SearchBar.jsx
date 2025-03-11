import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import "@/styles/search-bar.css"

import { useState, useEffect } from "react";

// Still need to set up web and data server to implement the search logic and search results.
const SearchBar = ({resetPosts, filterPosts}) => {

    const [searchText, setSearchText] = useState("")

    const HandleChange = (e) => {
        if (e.target.value.length == 0) {
            resetPosts()
        } 
        else {
            filterPosts(e.target.value)
        }
    }

    return (
        <div className='search-form'>
            <div className="search-container">
                <input
                    type="search"
                    placeholder='Type Here'
                    className='search-input'
                    value = {searchText}
                    onChange={
                        (e) => {
                            HandleChange(e)
                            setSearchText(e.target.value)
                        }
                    }
                />
                <button className='search-button'>
                    <AiOutlineSearch className='search-icon'/>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;