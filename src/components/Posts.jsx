"use client"
import Post from "@/components/Post";
import Button from "./Button";
import React, { useState, useEffect } from "react";

import axios from "axios";
import {PostsFetch10AscTimestamp} from "@/app/paths";
import { PostsFetch10DescTimestampOnUserID } from "@/app/paths";

import "@/styles/posts.css"

const Posts = ({collectedText}) => {

    const [originalPosts, setOriginalPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [page, setPage] = useState(1)
    const [filterText, setFilterText] = useState("")


    //Need a way of tracking current user, not like this variable
    const userID = 1;

    console.log("filterText: ", filterText)
    console.log("filterTextLength: ", filterText.length)
    console.log("collectedText: ", collectedText)
    console.log("collectedTextLegnth: ", filterText.length)

    var clean = false;
    const changeFilterText = async(text) => {
        setFilterText(text)
    }
    if (filterText != collectedText) {
        changeFilterText(collectedText)
        .then(() => {
            clean = true;
        })
    }

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
    const resetFilteredPosts = async() => {
        try {
            var submission = {
                "UserID": userID,
                "Offset": page
            }
            // setFilteredPosts(originalPosts)
            await axios.post(PostsFetch10DescTimestampOnUserID, submission)
            .then((res) => {
                setFilteredPosts(prevPosts => [...prevPosts, ...res.data])
            })
        } catch (err) {
            console.log(err)
        }
    };
    const fetchFilteredPosts = async() => {
        try {
            if (filterText.length == 0) {
                console.log("[filterText.length]: ", filterText.length)
                fetchOriginalPosts()
                .then(() => {
                    resetFilteredPosts();
                })
                return;
            }

            var filteredPosts = []
            console.log("Performing filtering operation...")
            for (var i = 0, post; i < originalPosts.length, post = originalPosts[i]; ++i) {
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

    const initialSetUp = async() => {
        fetchFilteredPosts()
        .then(() => {
            console.log("Initial [originalPosts]: ", originalPosts)
            console.log("Initial [filteredPosts]: ", filteredPosts)
        })
    }

    useEffect(() => {
        fetchFilteredPosts()
    }, [filterText])

    // useEffect(() => {
    //     fetchFilteredPosts()
    // },[filterText])

    console.log("[filteredPosts]: ", filteredPosts)
    return (
        <div id="posts">
            {filteredPosts
                // .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)) // Sort by date_time from earliest to latest
                .map((post, index) => (
                    <Post 
                        key={index}
                        body={post.Content}
                        display_name={post.Username}
                        num_likes={post.Likes}
                        is_liked_by_user={post.IsLikedByUser}
                        num_comments={post.CommentCount}
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