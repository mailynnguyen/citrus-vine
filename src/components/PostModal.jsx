"use client"
import React, { useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import axios from 'axios';

import "@/styles/post_modal.css";

const PostModal = ({ onClick, setCreate }) => {

    const [post, setPost] = useState({
        UserID: 1,
        Content: "",
        // date_time: "",
        Anonymous: false,
        Username: "mailyn"
    })

    const handleChange = (e) => {
        
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }))
        // setPost({ body: e.target.value, author: "" })
    }

    const handleClick = async (e) => {
        e.preventDefault()

        // const currDate = new Date()
        // const formattedDate = currDate.toISOString().slice(0, 19).replace('T', ' ')
        // const finalPost = {...post, date_time: formattedDate}

        try { 
            const res = await axios.post("http://localhost:3307/Posts/InsertForward", post)
            console.log("hello")
            console.log("post created: ", res.data)
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
                
                <button onClick={onClick}>
                    <X color="#E1AB69" size={48} id="x" />
                </button>

                <textarea 
                    onChange={handleChange} 
                    type="text" 
                    id="text" 
                    name="Content" 
                    placeholder="Type here..." 
                />

                <div id="post-modal-buttons">
                    <Button title="Anonymous ON" />
                    <Button title="Post" onClick={handleClick}/>
                </div>
                
            </div>
        </div>
        
    )
}

export default PostModal;