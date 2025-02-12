"use client";
import "../styles/style.css";

import { useState } from 'react'
// import React from 'react'

const GetWindowDimensions = () => {
  const {innerwidth, innerHeight} = window
  return (
    innerwidth,
    innerHeight
  )
}

import PusheenImage from "../images/pusheen-background-upscaled.png"
import CitrusVineLogo from "../images/citrus-vine-logo-scaled.png"
import { Geist } from "next/font/google";

const SignUp = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")


  const onFirstNameFieldChange = event => {
    setFirstName(event.target.value)
  }
  const onLastNameFieldChange = event => {
    setLastName(event.target.value)
  }
  const onUserNameFieldChange = event => {
    setUserName(event.target.value)
  } 
  const onPasswordFieldChange = event => {
    setPassword(event.target.value)
  }
  const onEmailFieldChange = event => {
    setEmail(event.target.value)
  }


  return (


    <div className="SignUp">


      <div style={{
        // width: "50px",
        // height: "50px",
        // fontFamily: geist-sans,
        backgroundImage: `url(${PusheenImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}>
          
      <div className="sign-up-title">Sign Up</div>
      <img src={CitrusVineLogo.src} className="citrus-logo"></img>
      
      <div>
        <div className="first-name-field"> First Name </div>
        <input className="first-name-field" value={firstName} placeholder="Enter first name..." type="text" onChange={onFirstNameFieldChange} />  
        <input className="last-name-field" value={lastName} placeholder="Enter last name..." type="text" onChange={onLastNameFieldChange} />
        <input className="user-name-field" value={userName} placeholder="Enter username..." type="text" onChange={onUserNameFieldChange} />  
        <input className="password-field" value={password} placeholder="Enter password..." type="text" onChange={onPasswordFieldChange} />
        <input className="email-field" value={email} placeholder="Enter email.." type="text" onChange={onEmailFieldChange} />
      </div>
      

      </div>
      {/* <img src={PusheenImage.src}></img> */}


      {/* <button> Click here! </button> */}
    </div>
  )
}

export default SignUp;