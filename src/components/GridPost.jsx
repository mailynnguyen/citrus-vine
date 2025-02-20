"use client";
import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "@/styles/gridpost.css";

const GridPost = () => {
  const [like, setLike] = useState(false);

  return (
    <div id="gridpost">
      <div id="post-header">
        <div id="title">
            <div id="profile-pic"></div>
            <div id="display-name">IEatDogFood</div>
        </div>
        <div id="time-stamp">
          <span className="date">12/12/2024</span>
          <span className="time">3:01 PM</span>
        </div>
      </div>

      {/* Content */}
      <p id="content">I am a good doggo.</p>

      {/* Buttons */}
      <div id="buttons">
        <div id="like-button" onClick={() => setLike(!like)}>
          {like ? (
            <Heart className="heart" fill="#BE4A31" strokeWidth={0} />
          ) : (
            <Heart className="heart" strokeWidth={1.3} color="#878787" />
          )}
          <p id="like-count">1024</p>
        </div>

        <div id="comment-button">
          <MessageCircle className="comment-button" />
          <p id="comment-count">2000</p>
        </div>
      </div>
    </div>
  );
};

export default GridPost;
