"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import '@/styles/signin.css';
import CitrusBg from "../images/citrus-bg.jpeg";


import axios from "axios";
import { UsersValidateAccount } from "@/app/paths";
import { UsersSession } from "@/app/paths";

import Link from 'next/link'


function SignIn() {
    const [user, enterUser] = useState("");
    const [password, enterPassword] = useState("");

    const AttemptSignIn = async(enteredUser, enteredPassword) => {
        try {
            var submission = {
                "Username": `\'${enteredUser}\'`,
                "Password": `\'${enteredPassword}\'`
            }
            console.log("Provided username: ", enteredUser)
            console.log("Provided password: ", enteredPassword)

            const result = await axios.post(UsersValidateAccount, submission, { withCredentials: true });
            console.log("[AttemptSignIn][Try]: ", result.data)

            const res =  await axios.get(UsersSession, { withCredentials: true });
            console.log("User's ID: " , res.data)
            return res.data
        }
        catch(err) {
            console.log("Error: ", err)
        }
    }
    const ClickSignIn = (enteredUsername, enteredPassword) => {
        AttemptSignIn(enteredUsername, enteredPassword)
            .then((userSession) => {
            if(!userSession ){
                alert("Invalid username or password.");
                return;
            }
            console.log("[AttemptSignIn][.then]: ", userSession)

            if (userSession) {
                console.log("Successful sign in!")
                //console.log(req.session.user.id)
                /*
                    Potentially insert routing process here.
                */
            }
        })
    }
    

    return(
        <section id="bg-holder" style={{backgroundImage: `url(${CitrusBg.src})`}}>
            <div className="sign-in-text">Citrus Vine</div>

            <div className="sign-in-form">
                <input type="text" id="userEntry" className="input-text" placeholder="Enter username..." value={user} onChange={(e) => enterUser(e.target.value)}></input>

                <input type="password" id="passwordEntry" className="input-text" placeholder="Enter password..." value={password} onChange={(e) => enterPassword(e.target.value)}></input>
                
                <button className="sign-in-button" onClick={() => ClickSignIn(user, password)}>Sign In</button>
            </div>


            {/*Need to implement functionality for buttons*/}
            <div id="alt-sign-in">
                <Link className="sign-in-button" href="/signup">Don't have an account?</Link>

                <button className="sign-in-button">Forgot password?</button>
            </div>
        </section> 
    )
}

export default SignIn;