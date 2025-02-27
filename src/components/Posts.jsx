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
                // console.log(res)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        };

        fetchAllPosts();
    },[]);

    return (
        <div>
            {posts.map((post, index) => (
                <Post 
                    key={index}
                    body={post.body}
                />
            ))}
        </div>
    )
}

export default Posts;