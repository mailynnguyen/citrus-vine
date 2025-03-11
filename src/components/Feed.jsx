"use client"

import React from "react"
import { useState, useEffect }  from "react"

import SearchBar from "./SearchBar"
import SideBar from "./SideBar"
import Posts from "./Posts"
import PostModal from "./PostModal"

import axios from "axios";
import { PostsFetch10DescTimestampOnUserID } from "@/app/paths";

const Feed = () => {

    const [create, setCreate] = useState(false);
    const [page, setPage] = useState(1)
    const incrementPage = () => {
        setPage(page + 1)
    }

    const [originalPosts, setOriginalPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
   
    console.log("ogPosts: ", originalPosts)
    console.log("filteredPosts: ", filteredPosts)

    const userID = 1;

    const fetchOriginalPosts = async() => {
        try {
            var submission = {
                "UserID": userID,
                "Offset": page
            }
            await axios.post(PostsFetch10DescTimestampOnUserID, submission)
            .then((res) => {
                setOriginalPosts(prevPosts => [...prevPosts, ...res.data])
            })
        } catch (err) {
            console.log(err)
        }
    };
    const resetFilteredPosts = () => {
        try {
            setFilteredPosts(originalPosts)
        } catch (err) {
            console.log(err)
        }
    };
    const fetchFilteredPosts = (collectedText) => {
        try {
            var filteredPosts = []
            console.log("Performing filtering operation...")
            for (var i = 0, post; i < originalPosts.length, post = originalPosts[i]; ++i) {
                if (post.Content.includes(collectedText) || post.Username.includes(collectedText)) {
                    console.log("Found a non-filtered post")
                    filteredPosts.push(post)
                }
            }
            setFilteredPosts(filteredPosts)
        }
        catch (err) {
            console.log(err)
        }
    }
    const getFilteredPosts = () => {
        return filteredPosts
    }

    useEffect(() => {
        fetchOriginalPosts();
        // resetFilteredPosts();
    }, [])

    useEffect(() => {
        resetFilteredPosts();
    }, [originalPosts])

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
            <SearchBar
                resetPosts={resetFilteredPosts}
                filterPosts={fetchFilteredPosts}>
            </SearchBar>
            <Posts
                getPosts={getFilteredPosts}
                incrementPage={incrementPage}>
            </Posts>
        </div>
        
        <SideBar onClick={handleOpen}/>
  
        {create ? <PostModal onClick={handleClose} setCreate={setCreate} /> : ""}
      </div>
    );
}

export default Feed;
  