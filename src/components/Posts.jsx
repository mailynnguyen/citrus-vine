"use client"
import Post from "@/components/Post";
import Button from "./Button";
import React, { useState, useEffect } from "react";

import axios from "axios";
import {PostsFetch10AscTimestamp} from "@/app/paths";

import "@/styles/posts.css"

const Posts = ({collectedText}) => {

    const [original_posts, setOriginalPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [filterText, setFilterText] = useState("")

    console.log("filterText: ", filterText)
    if (collectedText != filterText) {
        setFilterText(collectedText)
    }
    const ogFetchAllPosts = async() => {
        try {
            const res = await axios.get(`http://localhost:3307/Posts/Fetch10DescTimestamp?page=${page}`)
            console.log(res)
            setOriginalPosts(prevPosts => [...prevPosts, ...res.data])
        } catch (err) {
            console.log(err)
        }
    };
    const fetchAllPosts = async() => {
            try {
                const res = await axios.get(`http://localhost:3307/Posts/Fetch10DescTimestamp?page=${page}`)
                console.log(res)
                setPosts(prevPosts => [...prevPosts, ...res.data])
            } catch (err) {
                console.log(err)
            }
        };
    const filterPosts = async() => {
        try {
            if (filterText.length == 0) {
                setOriginalPosts([])
                setPosts([])
                ogFetchAllPosts()
                fetchAllPosts()
                console.log("filterText.length: ", filterText.length)
                return;
            }
            console.log("Filtering...")
            var filteredPosts = []
            for (var i = 0, post; i < original_posts.length, post = original_posts[i]; ++i) {
                console.log("[filterText]: ", filterText)
                console.log("[post.Content]: ", post.Content)
                console.log("[post.Username]: ", post.Username)
                if (post.Username == null || post.Content == null) {
                    continue;
                }
                if (post.Content.includes(filterText) || post.Username.includes(filterText)) {
                    console.log("Found a non-filtered post")
                    filteredPosts.push(post)
                }
            }
            await setPosts(filteredPosts)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    // useEffect(() => {
    //     fetchAllPosts();
    // },[page]);
    // useEffect(() => {
    //     ogFetchAllPosts()
    // }, [original_posts]);
    useEffect(() => {
        filterPosts();
    },[filterText])


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
                        pfp={post.UsedProfilePic}
                        num_likes={post.NumLikes}
                        num_comments={post.NumComments}
                    />
            ))}

            <div id="posts-load-more-btn">
                <Button title="Load More" onClick={(e) => {e.preventDefault(); setPage(page + 1)}}/>
            </div>

        </div>
    )
}

export default Posts;