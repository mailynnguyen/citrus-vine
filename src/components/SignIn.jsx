"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import '@/styles/signin.css';

function SignIn() {
    const [user, enterUser] = useState("");
    const [password, enterPassword] = useState("");

    return(
        <body id="bg-holder">
            <div class="sign-in-text">Citrus Vine</div>

            <form class="sign-in-form">
                <input type="text" id="userEntry" class="input-text" placeholder="Enter username..." value={user} onChange={(e) => enterUser(e.target.value)}></input>

                <input type="password" id="passwordEntry" class="input-text" placeholder="Enter password..." value={password} onChange={(e) => enterPassword(e.target.value)}></input>
                
                <input type="submit" value="Sign In" class="sign-in-button"></input>
            </form>

            {/*Need to implement functionality for buttons*/}
            <div id="alt-sign-in">
                <button class="sign-in-button">Don't have an account?</button>

                <button class="sign-in-button">Forgot password?</button>
            </div>
        </body> 
    )
}

export default SignIn;