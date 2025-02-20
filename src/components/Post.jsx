"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import { MessageCircle } from "lucide-react";
import '@/styles/post.css';


const Post = () => {

    const [like, setLike] = useState(false);

    
    return (
        <div id="post">

            <div id="profile-pic"></div>

            <div id="right-section">

                <div id="title">
                    <div id="display-name">BobaMilkTea</div>
                    <div id="time-stamp">12/12/2024 3:01 PM</div>
                </div>

                <p id ="content">
                    The trees...
                </p>

                <div id="buttons">
                    <div id="like-button">
                            {like
                                ? <Heart className="heart" id="heart-filled" onClick={() => setLike(!like)} fill="#BE4A31" strokeWidth={0} />
                                : <Heart className="heart" id="heart-outline" onClick={() => setLike(!like)} strokeWidth={1.3} color="#878787" />
                            }
                            <p id="like-count">8K</p>
                    </div>

                    <div id="comment-button">
                        <MessageCircle className="comment-button" />
                        <p id="comment-count">4378</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post;