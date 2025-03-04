"use client"
import Post from "@/components/Post";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {

    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchAllPosts = async() => {
            try {
                const res = await axios.get("http://localhost:8800/posts")
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
                .sort((a, b) => new Date(b.date_time) - new Date(a.date_time)) // Sort by date_time from earliest to latest
                .map((post, index) => (
                    <Post 
                        key={index}
                        body={post.body}
                        date_time={new Date(post.date_time).toISOString().slice(0, 19).replace('T', ' ')} // doing the splice b/c instance of Date
                    />
            ))}
        </div>
    )
}

export default Posts;