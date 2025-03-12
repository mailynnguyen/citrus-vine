"use client"
import React, { useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import axios from 'axios';

import "@/styles/post_modal.css";

const PostModal = ({ onClick, setCreate}) => {

    const [anonymous, setAnonymous] = useState(false)
    const [userID, setUserID] = useState(1)                     //HARDCODED REQUIRES UPDATE: PENDING SESSION
    const [username, setUsername] = useState("\'jules\'")       //HARDCODED REQUIRES UPDATE: PENDING SESSION
    const [post, setPost] = useState({
        UserID: userID,
        Username: username,
        Content: "",
        Anonymous: anonymous,
    })

    // console.log("[PostModal][Anonymous]: ", anonymous)
    // console.log("[PostModal][Username]: ", username)
    // console.log("[PostModal][post]: ", post)

    const handleAnon = (e) => {
        e.preventDefault()

        // Update anonymous state and use the updated state to set the post
        setAnonymous(prev => {
            if (!prev === true) 
                setPost(prevPost => ({ ...prevPost, Anonymous: !prev, Username: "Anonymous" }))
            else 
                setPost(prevPost => ({ ...prevPost, Anonymous: !prev}));
            return !prev;  // Return the new value for anonymous
        });
    }

    const handleChange = (e) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value}))
        // setPost({ body: e.target.value, author: "" })
    }

    const handleClick = async (e) => {
        e.preventDefault()

        try { 
            // console.log("[PostModal][handleClick()]")
            // console.log("[PostModal][Post]: ", post)
            const res = axios.post("http://localhost:3307/Posts/InsertForwardAllRequiredAttributes", post).then(() => {
              console.log("hello")
              console.log("post created: ", res.data)
              // refreshFeed("");
              setCreate(false)
            })

        } catch (err) {
            console.log(err)
            if (err.res) {
                console.log(err.res, "error res")
            }
        }

        setCreate(false)
        document.body.style.overflow = "auto"; // Disable scrolling when modal is open
    }


    console.log(post)

    return (
        <div>
            <div id="overlay" />
            
            <div id="outer-box">

                <div className="inner-content-holder">
                    <textarea 
                        onChange={handleChange} 
                        type="text" 
                        id="text" 
                        name="Content" 
                        placeholder="Type here..." 
                    />

                    <div id="post-modal-buttons">
                        {
                            anonymous
                            ? <Button title="Anonymous is ON" onClick={handleAnon} />
                            : <Button title="Anonymous is OFF" onClick={handleAnon} />

                        }
                        
                        <Button title="Post" onClick={handleClick}/>
                    </div>

                </div>

                <button onClick={onClick} id="x" data-testid="x-test">
                    <X color="#E1AB69" size={48}/>
                </button>
            </div>
        </div>
        
    )
}

export default PostModal;