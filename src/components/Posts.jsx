"use client"
import Post from "@/components/Post";
import Button from "./Button";
import React, { useState, useEffect} from "react";

import axios from "axios";
import {PostsFetch10AscTimestamp} from "@/app/paths";
import { PostsFetch10DescTimestampOnUserID } from "@/app/paths";

import "@/styles/posts.css"
import { pages } from "next/dist/build/templates/app-page";

const Posts = ({collectedText}) => {

    const [userID, setUserID] = useState(1) //HARDCODED REQUIRES UPDATE

    const [totalNumPosts, setTotalNumPosts] = useState()
    const [original_posts, setOriginalPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [filterText, setFilterText] = useState("")



    console.log("filterText: ", filterText)
    console.log("Length [original_posts]: ", original_posts.length)
    console.log("Length [posts]: ", posts.length)
    console.log("Total num posts: ", totalNumPosts)
    if (collectedText != filterText) {
        setFilterText(collectedText)
    }

    const getTotalNumberPosts = async() => {
        try {
            const res = await axios.get(`http://localhost:3307/Posts/GetTotalPosts`)
            console.log("Called [getTotalNumberPosts()]: ", res.data[0].NumPosts)
            setTotalNumPosts(res.data[0].NumPosts)
        } catch (err) {
            console.log(err)
        } 
    }
    const ogFetchAllPosts = async() => {
        try {
            if (page * 10 > totalNumPosts) {
                const res = await axios.get(`http://localhost:3307/Posts/FetchAllFilled?user_id=${userID}`)
                console.log("Called [ogFetchAllPosts()][FetchAllFilled]: ", res)
                setOriginalPosts(res.data)   
                return;
            }
            const res = await axios.get(`http://localhost:3307/Posts/Fetch10DescTimestampOnUserID?page=${page}&user_id=${userID}`)
            console.log("Called [ogFetchAllPosts()]: ", res)
            setOriginalPosts(prevPosts => [...prevPosts, ...res.data])
        } catch (err) {
            console.log(err)
        }
    };
    const fetchAllPosts = async() => {
        try {
            if (page * 10 > totalNumPosts) {
                const res = await axios.get(`http://localhost:3307/Posts/FetchAllFilled?user_id=${userID}`)
                console.log("Called [fetchAllPosts()][FetchAllFilled]: ", res)
                setPosts(res.data)   
                return;
            }
            const res = await axios.get(`http://localhost:3307/Posts/Fetch10DescTimestampOnUserID?page=${page}&user_id=${userID}`)
            console.log("Called [fetchAllPosts()]: ", res)
            setPosts(prevPosts => [...prevPosts, ...res.data])
        } catch (err) {
            console.log(err)
        }
    };

    //UNUSED FOR NOW
    const resetPostsToDefault = async() => {
        setPage(1)
        try {
            const res = await axios.get(`http://localhost:3307/Posts/Fetch10DescTimestampOnUserID?page=0&user_id=${userID}`)
            setOriginalPosts(res.data)
            setPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    var recently_filtered = false
    const filterPosts = async() => {
        try {
            console.log("Called [filterPosts()]")
            if (filterText.length == 0) {
                setOriginalPosts([])
                setPosts([])
                setPage(1)
                ogFetchAllPosts()
                fetchAllPosts()
                console.log("Condition [filterText.length]: ", filterText.length)
                return;
            }
            console.log("Condition [Action]: Filtering posts...")
            var filteredPosts = []
            recently_filtered = true;
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
    //     filterPosts();
    // }, [])
    // useEffect(() => {
    //     fetchAllPosts();
    // },[page]);
    // useEffect(() => {
    //     ogFetchAllPosts()
    // }, [original_posts]);
    useEffect(() => {
        getTotalNumberPosts()
    }, [])

    const FetchMoreAndFilter = async () => {
        if (posts.length >= 10 || original_posts.length >= totalNumPosts) {
            return;
        }
        ogFetchAllPosts().then(() => {
            fetchAllPosts().then(() => {
                filterPosts().then(() => {
                    setPage(page + 1);
                })
            })
        })
    }
    var recently_ran = false;
    useEffect(() => {
        filterPosts();
        if (posts.length <= 10 && original_posts.length < totalNumPosts) {
            setPage(page + 1)
        }
        // FetchMoreAndFilter();
        recently_ran = true;
    },[filterText])

    // useEffect(() => {
    //     filterPosts();
    // },[page])
    const HandleClick = async () => {
        setPage(page + 1);
    }

    useEffect(() => {
        if (!recently_ran) {
            FetchMoreAndFilter()
        }     
    }, [page])



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
                        pfp={post.AssignedProfilePic}
                        num_likes={post.NumLikes}
                        num_comments={post.NumComments}
                        is_liked={post.IsLikedByUser}
                        post_id={post.PostID}
                        user_id_viewer={userID}
                    />
            ))}

            <div id="posts-load-more-btn">
                <Button title="Load More" onClick={(e) => {
                    e.preventDefault(); 
                    HandleClick(); 
                }}/>
            </div>

        </div>
    )
}

export default Posts;