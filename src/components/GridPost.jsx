"use client";
import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "@/styles/gridpost.css";

const GridPost = () => {
  const [like, setLike] = useState(false);

  return (
    <div class="gridpost">
      <div class="gridpost-side-decor gridpost-left-decor"></div>

      <div class="gridpost-interior">
        <div class="gridpost-header">
          <div class="gridpost-info-holder">
              <div class="gridpost-profile-pic"></div>
              <div /*id="display-name"*/>IEatDogFood</div>
          </div>
          <div class="gridpost-time-stamp">
            <span className="date">12/12/2024</span>
            <span className="time">3:01 PM</span>
          </div>
        </div>

        {/* Content */}
        <p class="gridpost-content">I am a good doggo. Munch munch CRONCH chew chew</p>

        {/* Buttons */}
        <div class="gridpost-button-holder">
          <div class="gridpost-like-button" onClick={() => setLike(!like)}>
            {like ? (
              <Heart className="heart" fill="#BE4A31" strokeWidth={0} />
            ) : (
              <Heart className="heart" strokeWidth={1.3} color="#878787" />
            )}
            <p /*id="like-count"*/>1024</p>
          </div>

          <div class="gridpost-comment-button">
            <MessageCircle className="comment-button" />
            <p /*id="comment-count"*/>2000</p>
          </div>
        </div>
      </div>

      <div class="gridpost-side-decor gridpost-right-decor"></div>
    </div>
  );
};

export default GridPost;
