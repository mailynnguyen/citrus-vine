"use client"
import React, { useState } from "react";

import PostModal from "@/components/PostModal";
import Posts from "@/components/Posts";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Feed from "@/components/Feed";

import { LogIn } from "lucide-react";
import SignIn from "@/components/SignIn";

export default function Home() {

  return(
    <div>
      <SignIn/>
    </div>
  )
}