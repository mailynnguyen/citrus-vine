"use client"
import React, { useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import axios from 'axios';

import "@/styles/post_modal.css";

const PostModal = () => {

    const [post, setPost] = useState({
        body: "",
    })

    const handleChange = (e) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }))
        // setPost({ body: e.target.value, author: "" })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try { 
            const res = await axios.post("http://localhost:8800/posts", post)
            console.log("post created: ", res.data)
        } catch (err) {
            console.log(err)
            if (err.res) {
                console.log(err.res, "error res")
            }
        }
    }


    console.log(post)

    return (
        <div id="outer-box">
            
            <button>
                <X color="#E1AB69" size={48} id="x" />
            </button>

            <textarea 
                onChange={handleChange} 
                type="text" 
                id="text" 
                name="body" 
                placeholder="Type here..." 
            />

            <div id="buttons">
                <Button title="Anonymous ON" />
                <Button title="Post" onClick={handleClick}/>
            </div>
            
        </div>
    )
}

export default PostModal;