"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import '@/styles/comment.css';

const Comment = () => {

    const [like, setLike] = useState(false);

    return (
        <div id="comment">
        
            <div id="profile-pic"></div>

            <div id="right-section">

                <div id="title">
                    <div id="display-name">XxPotatoSlicerxX</div>
                    <div id="time-stamp">12/12/2024 3:01 PM</div>
                </div>

                <p id="content">
                    WHY ARE THERE NO DIVIDERS BETWEEN THE STALLS IN THE MALE RESTROOMS? WHAT KIND OF DESIGN IS THAT?
                </p>

                <div id="like">
                    {like
                        ? <Heart className="heart" id="heart-filled" onClick={() => setLike(!like)} fill="#BE4A31" strokeWidth={0} />
                        : <Heart className="heart" id="heart-outline" onClick={() => setLike(!like)} strokeWidth={1.3} color="#878787" />
                    }
                    <p id="like-count">347</p>
                </div>

            </div>
   
        </div>
    )
}

export default Comment;