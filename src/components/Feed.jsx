"use client"

import React from "react"
import { useState, useEffect, useRef}  from "react"

import SearchBar from "./SearchBar"
import SideBar from "./SideBar"
import Posts from "./Posts"
import PostModal from "./PostModal"

const Feed = () => {

    const [refresh, setRefresh] = useState("")
    const [create, setCreate] = useState(false);
    const [collectedText, setCollectedText] = useState("")

    const isMounted = useRef(false)

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

    useEffect (() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      setRefresh("refresh")
      console.log("[Feed][Action] Create was changed.")
      setCollectedText("");
    }, [create])
  
    return (
      <div>
        <div key={create}>
          <SearchBar sendText = {setCollectedText}/>
          <Posts collectedText={collectedText} refresh_value={refresh}/>
        </div>
        
        <SideBar onClick={handleOpen}/>
  
        {create ? <PostModal onClick={handleClose} setCreate={setCreate}/> : ""}
      </div>
    );
}

export default Feed;
  