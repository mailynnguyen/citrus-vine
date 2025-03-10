"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import { MessageCircle } from "lucide-react";
import '@/styles/post.css';


const Post = ({post_id, body, date_time, display_name, num_likes, is_liked_by_user, num_comments}) => {

    const [postID, setPostID] = useState(0)
    if (postID != post_id) {
        setPostID(postID)
    } 

    const [numLikes, setNumLike] = useState(false);
    setNumLike(num_likes)

    const [isLikedByUser, setIsLikedByUser] = useState(false)
    if (is_liked_by_user) {
        setIsLikedByUser(true)
    } else {
        setIsLikedByUser(false)
    }

    const [numComments, setNumComments] = useState(false)
    if (numComments != numComments) {
        setNumComments(num_comments)
    }

    
    return (
        <div id="post">

            <div id="profile-pic"></div>

            <div className="right-section">

                <div id="title">
                    <div id="display-name">{display_name}</div>
                    <div className="time-stamp">{date_time}</div>
                </div>

                <p className ="post-content">
                    {body}
                </p>

                <div className="post-button-holder">
                    <div className="post-like-button">
                            {isLikedByUser
                                ? <Heart className="heart" id="heart-filled" onClick={() => setLike(!like)} fill="#BE4A31" strokeWidth={0} />
                                : <Heart className="heart" id="heart-outline" onClick={() => setLike(!like)} strokeWidth={1.3} color="#878787" />
                            }
                            <p id="like-count">{numLikes}</p>
                    </div>

                    <div className="post-comment-button">
                        <MessageCircle className="comment-button" />
                        <p id="comment-count">0</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post;