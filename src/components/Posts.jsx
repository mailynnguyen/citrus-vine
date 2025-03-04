"use client"
import Post from "@/components/Post";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {

    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchAllPosts = async() => {
            try {
                const res = await axios.get("http://localhost:3307/Posts/FetchAll")
                console.log(res)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        };

        fetchAllPosts();
    },[]);

    return (
          
        <div>
            {posts
                .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)) // Sort by date_time from earliest to latest
                .map((post, index) => (
                    <Post 
                        key={index}
                        body={post.Content}
                        display_name={post.Username}
                        date_time={new Date(post.Timestamp).toISOString().slice(0, 19).replace('T', ' ')} // doing the splice b/c instance of Date
                    />
            ))}
        </div>
    )
}

export default Posts;