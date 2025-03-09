"use client"
import React, { useState } from "react";
import { Heart } from 'lucide-react';
import '@/styles/signin.css';
import CitrusBg from "../images/citrus-bg.jpeg";

import { UsersValidateAccount } from "@/app/paths";

function SignIn() {
    const [user, enterUser] = useState("");
    const [password, enterPassword] = useState("");

    const AttemptSignIn = async(enteredUser, enteredPassword) => {
        try {
            var submission = {
                "Username": enteredUser,
                "Password": enteredPassword
            }
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
            }
            else {
                alert("Invalid username or password.")
            }
        })
    }
    

    return(
        <section id="bg-holder" style={{backgroundImage: `url(${CitrusBg.src})`}}>
            <div className="sign-in-text">Citrus Vine</div>

            <form className="sign-in-form">
                <input type="text" id="userEntry" className="input-text" placeholder="Enter username..." value={user} onChange={(e) => enterUser(e.target.value)}></input>

                <input type="password" id="passwordEntry" className="input-text" placeholder="Enter password..." value={password} onChange={(e) => enterPassword(e.target.value)}></input>
                
                <input type="submit" value="Sign In" className="sign-in-button" onClick={() => ClickSignIn(enteredUsername, enteredPassword)}></input>
            </form>

            {/*Need to implement functionality for buttons*/}
            <div id="alt-sign-in">
                <button className="sign-in-button">Don't have an account?</button>

                <button className="sign-in-button">Forgot password?</button>
            </div>
        </section> 
    )
}

export default SignIn;