"use client"
import Post from "@/components/Post";
import Button from "./Button";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "@/styles/posts.css"

const Posts = () => {

    const [posts, setPosts] = useState([])

    const [page, setPage] = useState(1)
    
    useEffect(() => {
        const fetchAllPosts = async() => {
            try {
                const res = await axios.get(`http://localhost:3307/Posts/Fetch10?page=${page}`)
                console.log(res)
                setPosts(prevPosts => [...prevPosts, ...res.data])
            } catch (err) {
                console.log(err)
            }
        };

        fetchAllPosts();
    },[page]);


    return (
        <div id="posts">
            {posts
                // .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)) // Sort by date_time from earliest to latest
                .map((post, index) => (
                    <Post 
                        key={index}
                        body={post.Content}
                        display_name={post.Username}
                        date_time={new Date(post.Timestamp).toISOString().slice(0, 19).replace('T', ' ')} // doing the splice b/c instance of Date
                    />
            ))}

            <div id="posts-load-more-btn">
                <Button title="Load More" onClick={(e) => {e.preventDefault(); setPage(page + 1)}}/>
            </div>

        </div>
    )
}

export default Posts;