"use client"
import React, { useState } from "react";

import PostModal from "@/components/PostModal";
import Posts from "@/components/Posts";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Feed from "@/components/Feed";

export default function Home() {

  return(
    <div>
      <Feed/>
    </div>
  )
}