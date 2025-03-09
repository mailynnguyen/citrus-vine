"use client"

import React from "react"
import { useState, useEffect }  from "react"

import SearchBar from "./SearchBar"
import SideBar from "./SideBar"
import Posts from "./Posts"
import PostModal from "./PostModal"

const Feed = () => {

    const [create, setCreate] = useState(false);
    const [collectedText, setCollectedText] = useState("")

    useEffect(() => {

    }, [collectedText])
  
    const handleOpen = (e) => {
      e.preventDefault();
      setCreate(true)
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
      // console.log(create)
    }
  
    const handleClose = (e) => {
      e.preventDefault()
      setCreate(false)
      document.body.style.overflow = "auto"; // Disable scrolling when modal is open
    }
  
    return (
      <div>
        <div>
          <SearchBar sendText = {setCollectedText}/>
          <Posts collectedText={collectedText}/>
        </div>
        
        <SideBar onClick={handleOpen}/>
  
        {create ? <PostModal onClick={handleClose} setCreate={setCreate} /> : ""}
      </div>
    );
}

export default Feed;
  