
"use client";
import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import "@/styles/gridpost.css";

const GridPost = ({body, date_time, display_name, pfp, num_likes, num_comments}) => {
  const [like, setLike] = useState(false);

  return (
    <div className="gridpost">
      <div className="gridpost-info-holder">
        <img src={"/" + pfp} className="gridpost-profile-pic"></img>
        <div /*id="display-name"*/ className="gridpost-name">
          {display_name}
        </div>
        <div className="gridpost-time-stamp">
          {date_time}
        </div>
      </div>

      <div className="gridpost-content">
        {body}
      </div>

      {/* Buttons */}
      <div className="buttons-gridpost">
        <div className="like-button" onClick={() => setLike(!like)}>
          {like ? (
            <Heart className="heart" fill="#BE4A31" strokeWidth={0} />
          ) : (
            <Heart className="heart" strokeWidth={1.3} color="#878787" />
          )}
          <p id="like-count">{num_likes}</p>
        </div>

        <div className="comment-button">
          <MessageCircle className="commentbutton" />
          <p id="comment-count">{num_comments}</p>
        </div>
      </div>
    </div>

  )
}

export default GridPost;
