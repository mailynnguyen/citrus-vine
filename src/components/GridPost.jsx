"use client";
import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "@/styles/gridpost.css";

const GridPost = () => {
  const [like, setLike] = useState(false);

  return (
    <div className="gridpost">
      <div className="gridpost-side-decor gridpost-left-decor"></div>

      <div className="gridpost-interior">
        <div className="gridpost-header">
          <div className="gridpost-info-holder">
              <div className="gridpost-profile-pic"></div>
              <div /*id="display-name"*/>IEatDogFood</div>
          </div>
          <div className="gridpost-time-stamp">
            <span className="date">12/12/2024</span>
            <span className="time">3:01 PM</span>
          </div>
        </div>

        {/* Content */}
        <p className="gridpost-content">I am a good doggo. Munch munch CRONCH chew chew</p>

        {/* Buttons */}
        <div className="gridpost-button-holder">
          <div className="gridpost-like-button" onClick={() => setLike(!like)}>
            {like ? (
              <Heart className="heart" fill="#BE4A31" strokeWidth={0} />
            ) : (
              <Heart className="heart" strokeWidth={1.3} color="#878787" />
            )}
            <p /*id="like-count"*/>1024</p>
          </div>

          <div className="gridpost-comment-button">
            <MessageCircle className="comment-button" />
            <p /*id="comment-count"*/>2000</p>
          </div>
        </div>
      </div>

      <div className="gridpost-side-decor gridpost-right-decor"></div>
    </div>
  );
};

export default GridPost;
