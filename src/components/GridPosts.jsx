"use client"
import GridPost from "@/components/GridPost";
import Button from "./Button";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";

import "@/styles/gridposts.css"

const GridPosts = ( {id} ) => {

    const [gridPosts, setGridPosts] = useState([])

    //const [page, setPage] = useState(1)
    
    useEffect(() => {
        const fetchUser = async() => {
            try {
                const {data} = await axios.post(`http://localhost:3307/Posts/FetchOnUserID`, {UserID: id});

                console.log(data)
                setGridPosts(data)
            } catch (err) {
                console.log(err)
            }
        };

        fetchUser();
    }, []);


    return (
        <Suspense>
        <div id="posts">
            {gridPosts
                // .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)) // Sort by date_time from earliest to latest
                .map((gridPost, index) => (
                    <GridPost 
                        key={index}
                        body={gridPost.Content}
                        display_name={gridPost.Username}
                        date_time={new Date(gridPost.Timestamp).toISOString().slice(0, 19).replace('T', ' ')} // doing the splice b/c instance of Date
                        pfp={gridPost.UsedProfilePic}
                        num_likes={gridPost.NumLikes}
                        num_comments={gridPost.NumComments}
                    />
            ))}

        </div>
        </Suspense>
    )
}

export default GridPosts;