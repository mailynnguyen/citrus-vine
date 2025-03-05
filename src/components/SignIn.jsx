"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import '@/styles/signin.css';
import CitrusBg from "../images/citrus-bg.jpeg";

function SignIn() {
    const [user, enterUser] = useState("");
    const [password, enterPassword] = useState("");

    return(
        <body id="bg-holder" style={{backgroundImage: `url(${CitrusBg.src})`}}>
            <div className="sign-in-text">Citrus Vine</div>

            <form className="sign-in-form">
                <input type="text" id="userEntry" className="input-text" placeholder="Enter username..." value={user} onChange={(e) => enterUser(e.target.value)}></input>

                <input type="password" id="passwordEntry" className="input-text" placeholder="Enter password..." value={password} onChange={(e) => enterPassword(e.target.value)}></input>
                
                <input type="submit" value="Sign In" className="sign-in-button"></input>
            </form>

            {/*Need to implement functionality for buttons*/}
            <div id="alt-sign-in">
                <button className="sign-in-button">Don't have an account?</button>

                <button className="sign-in-button">Forgot password?</button>
            </div>
        </body> 
    )
}

export default SignIn;