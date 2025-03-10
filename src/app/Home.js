"use client"
import React, { useState } from "react";

import PostModal from "@/components/PostModal";
import Posts from "@/components/Posts";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

export default function Home() {

  const [create, setCreate] = useState(false);

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
        <SearchBar />
        <Posts />
      </div>
      
      <SideBar onClick={handleOpen}/>

      {create ? <PostModal onClick={handleClose} setCreate={setCreate} /> : ""}
    </div>
  );
}
