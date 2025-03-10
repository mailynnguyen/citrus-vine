import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import "@/styles/search-bar.css"

import { useState, useEffect } from "react";

// Still need to set up web and data server to implement the search logic and search results.
const SearchBar = ({sendText}) => {

    var [text, setText] = useState("")

    var inputText = ""
    const ClickAction = () => {
        if (inputText === "") {
            console.log("Sent text 1")
            sendText(text)
        }
        else {
            console.log("Sent text 2")
            sendText(inputText)
        }
    }
    return (
        <div className='search-form'>
            <div className="search-container">
                <input
                    type="search"
                    placeholder='Type Here'
                    className='search-input'
                    value = {text}
                    onChange={
                        (e) => {
                            setText(e.target.value);
                            inputText = e.target.value;
                        }
                    }
                />
                <button className='search-button'
                    onClick={ClickAction}>
                    <AiOutlineSearch className='search-icon'/>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;