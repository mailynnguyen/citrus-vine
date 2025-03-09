"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import '@/styles/signin.css';
import CitrusBg from "../images/citrus-bg.jpeg";


import axios from "axios";
import { UsersValidateAccount } from "@/app/paths";
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
            var result = axios.post(UsersValidateAccount, submission)
            console.log("[AttemptSignIn][Try]: ", result)
            return result
        }
        catch(err) {
            console.log("Error: ", err)
        }
    }
    const ClickSignIn = (enteredUsername, enteredPassword) => {
        AttemptSignIn(enteredUsername, enteredPassword)
            .then((result) => {
            var valid = result.data[0].Outcome
            console.log("[AttemptSignIn][.then]: ", valid)

            if (valid) {
                console.log("Successful sign in!")
                /*
                    Potentially insert routing process here.
                */
            }
            else {
                alert("Invalid username or password.")
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