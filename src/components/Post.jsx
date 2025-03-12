"use client"
import React, { useState, useEffect, useRef } from "react";
import { Heart } from 'lucide-react';
import { MessageCircle } from "lucide-react";
import '@/styles/post.css';

import axios from "axios";
import { PostsIncrementLikes, PostsDecrementLikes, PostsGetLikes} from "@/app/paths";

const Post = ({ post_id, body, date_time, display_name, pfp, num_likes, num_comments, is_liked, user_id_viewer}) => {

    const [userIDViewer, setUserID] = useState(user_id_viewer)
    const [postID, setPostID] = useState(post_id)
    const [numLikes, setNumLikes] = useState(num_likes)
    const [like, setLike] = useState(is_liked);

    const isMounted = useRef(false)
    // console.log("[Post][userIDViewer]: ", userIDViewer)
    // console.log("[Post][postID]: ", postID)
    console.log("[Post][numLikes]: ", numLikes)
    // console.log("[Post][like]: ", like)


    const Like = async() => {
        setLike(!like)
        axios.post(PostsIncrementLikes, {"PostID": postID, "UserID": userIDViewer}).then((result) => {
            console.log("[Post][Like()][axios.post]: ", result)
            setNumLikes(numLikes + 1)
        })
        // numLikes = res.data[0].NumLikes
    }
    const Unlike = async() => {
        setLike(!like)
        axios.post(PostsDecrementLikes, {"PostID": postID, "UserID": userIDViewer}).then((result) => {
            console.log("[Post][Unlike()][axios.post]: ", result)
            setNumLikes(numLikes - 1)
        })
        // numLikes = res.data[0].NumLikes
    }


    // const RefetchNumLikes = async() => {
    //     axios.post(PostsGetLikes, {"PostID": postID}).then((result) => {
    //         // console.log("[Post][RefetchNumLikes]: ", result.data[0].Likes)
    //         setNumLikes(result.data[0].Likes)
    //         console.log(numLikes)
    //     })
    // }
    // useEffect(() => {
    //     if (!isMounted.current) {
    //         isMounted.current = true;
    //         return;
    //     }
        
    //     // RefetchNumLikes()
    // }, [like])
    
    
    return (
        <div id="post">

            <img src={pfp} id="profile-pic"></img>

            <div className="right-section">

                <div id="title">
                    <div id="display-name">{display_name}</div>
                    <div className="time-stamp">{date_time}</div>
                </div>

                <p className ="post-content">
                    {body}
                </p>

                <div className="post-button-holder" key={numLikes}>
                    <div className="post-like-button">
                            {like
                                ? <Heart className="heart" id="heart-filled" onClick={() => Unlike()} fill="#BE4A31" strokeWidth={0} />
                                : <Heart className="heart" id="heart-outline" onClick={() => Like()} strokeWidth={1.3} color="#878787" />
                            }
                            <p id="like-count">{numLikes}</p>
                    </div>

                    <div className="post-comment-button">
                        <MessageCircle className="comment-button" />
                        <p id="comment-count">{num_comments}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post;