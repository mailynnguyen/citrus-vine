"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import { MessageCircle } from "lucide-react";
import '@/styles/post.css';


const Post = ({ body, date_time, display_name }) => {

    const [like, setLike] = useState(false);

    
    return (
        <div id="post">

            <div id="profile-pic"></div>

            <div class="right-section">

                <div id="title">
                    <div id="display-name">{display_name}</div>
                    <div class="time-stamp">{date_time}</div>
                </div>

                <p class ="post-content">
                    {body}
                </p>

                <div class="post-button-holder">
                    <div class="post-like-button">
                            {like
                                ? <Heart className="heart" id="heart-filled" onClick={() => setLike(!like)} fill="#BE4A31" strokeWidth={0} />
                                : <Heart className="heart" id="heart-outline" onClick={() => setLike(!like)} strokeWidth={1.3} color="#878787" />
                            }
                            <p id="like-count">0</p>
                    </div>

                    <div class="post-comment-button">
                        <MessageCircle className="comment-button" />
                        <p id="comment-count">0</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post;