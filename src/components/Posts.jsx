
//General
"use client"
import React, { useState, useEffect } from "react";

//Style
import "@/styles/posts.css"

//Components
import Post from "@/components/Post";
import Button from "./Button";


const Posts = ({getPosts, incrementPage}) => {

    const [currentPosts, setCurrentPosts] = useState([])

    if (currentPosts != getPosts()) {
        setCurrentPosts(getPosts())
    }

    // useEffect(() => {
    //     getPosts()
    // }, [currentPosts])
    
    return (
      <div>
            <div id="posts">
                {currentPosts
                    .map((post, index) => (
                        <Post 
                            key={index}
                            body={post.Content}
                            display_name={post.Username}
                            num_likes={post.Likes}
                            is_liked_by_user={post.IsLikedByUser}
                            num_comments={post.CommentCount}
                            date_time={new Date(post.Timestamp).toISOString().slice(0, 19).replace('T', ' ')}>
                        </Post> // doing the splice b/c instance of Date
                ))}

                <div id="posts-load-more-btn">
                    <Button 
                        title="Load More" 
                        onClick={(e) => {e.preventDefault(); incrementPage()}}>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Posts;