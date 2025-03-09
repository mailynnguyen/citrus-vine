"use client";
import "../styles/sign-up.css";

// React
import { useState, useEffect } from 'react'
import { User } from "lucide-react";

// Images
import PusheenImage from "../images/pusheen-background-upscaled-dimmed.png"
import CitrusVineLogo from "../images/BearCutie Logo.svg"

// DB
import { UsersInsertForward, UsersCheckUsernameExists} from "@/app/paths";
import axios from "axios";


const InputField = ({fieldName, fieldPlaceHolder, fieldWidth, setUsername, setPassword, setEmail}) => {

  const [fieldValue, setFieldValue] = useState("")
  const onFieldValueChange = async (event) => {
    setFieldValue(event.target.value)
    if (fieldName == "Username") {setUsername(fieldValue)}
    if (fieldName == "Password") {setPassword(fieldValue)}
    if (fieldName == "Email") {setEmail(fieldValue)}
  }

  return (
    <div className="input-field" style={{width:`${fieldWidth}`}}>
      <div className="sign-up-text">{fieldName}</div>
      <input value={fieldValue} placeholder={fieldPlaceHolder} type="text" onChange={onFieldValueChange} className= "sign-up-input" /*style={{width:`${fieldWidth}`, height:"30px", borderRadius:"10px", paddingLeft:"10px"}}*/ />  
    </div>
  )
}

const Button = ({buttonText, buttonAction}) => {
  return (
    <div>
      <button onClick={buttonAction} className="sign-up-button">{buttonText}</button>
    </div>
  )
}

const SubmitData = async (username, password, email) => {

  /*
      Prevent alert spam on refresh by having this base case exist.
  */
  if (username == "" || password == "" || email == "") {
    return;
  }
  console.log(`Given username: ${username}`)
  console.log(`Given password: ${password}`)
  console.log(`Given email: ${email}`)


  /*
      Checks whether the username specified already exists. UserID is primary
      key but it would also just be weird for two accounts to have the same 
      username.
  */
  const CheckExists = async (username) => {
    try{
      var result = await axios.post(UsersCheckUsernameExists, {"Username": `\'${username}\'`})
      console.log("[CheckExists] result: ", result)
      return result;
    }
    catch (err) {
      console.log("Error: ", err)
    }
  }    
  CheckExists(username)
    .then((result) => {

      console.log("result: ", result.data[0].Existence)
      const does_username_exist = result.data[0].Existence;
      if (does_username_exist) {
        alert("Invalid username. Username already exists!")
        return;
      }
      else {
        console.log("Valid username!")
      }
    })


  /*
      Preparing information for submission. Is very nice to structure
      everything in a nice json-like variable.
  */
  const AddAccount = async (username, password, email) => {
    try {
      var submission_json = {
        "Username": `\'${username}\'`, 
        "Password": `\'${password}\'`,
        "Bio": `\'Hey I'm ${username}!\'`,
        "Email": `\'${email}\'`
      }
      var result = await axios.post(UsersInsertForward, submission_json)
      console.log("[AddAccount] result: ", result)
      return result;
    }
    catch (err) {
      console.log("Error: ", err)
    }
  }
  AddAccount(username, password, email)
    .then((result) => {
      console.log("Ran AddAcount: ", result)
    })
  

}

const SignUp = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const updateUsername = (updatedUsername) => {
    setUsername(prevUsername => updatedUsername)
  }
  const updatePassword = (updatedPassword) => {
    setPassword(prevPassword => updatedPassword)
  }
  const updateEmail = (updatedEmail) => {
    setEmail(prevEmail => updatedEmail)
  }
  useEffect(() => {
    console.log("Updated parameters...")
  }, [username, password, email])

  console.log("\n")
  console.log("Username: ", username)
  console.log("Password: ", password)
  console.log("Email: ", email)

  return (
    <section id="sign-up-background" style ={{backgroundImage: `url(${PusheenImage.src})`}}>

      <div className="sign-up-title">Sign Up</div><br></br>
      <img src={CitrusVineLogo.src} className="sign-up-citrus-vine-logo"></img>
      
      <div className="sign-up-field-container">
        {/*  
          First name and last name fields deemed unnecessary for now
          due to the amount of overhead refactoring would bring to 
          connection.js
        */}
        {/* 
        <InputField fieldName="First Name" fieldPlaceHolder="Enter first name..."/>
        <InputField fieldName="Last Name" fieldPlaceHolder="Enter last name..."/> 
        */}

        <InputField fieldName="Username" 
          fieldPlaceHolder="Enter user name..." 
          setUsername={updateUsername}
          setPassword={updatePassword}
          setEmail={updateEmail}
        />
        <InputField fieldName="Password" 
          fieldPlaceHolder="Enter password..."
          setUsername={updateUsername}
          setPassword={updatePassword}
          setEmail={updateEmail}
        />
        <InputField fieldName="Email" 
          fieldPlaceHolder="Enter email..." 
          fieldWidth="100%"
          setUsername={updateUsername}
          setPassword={updatePassword}  
          setEmail={updateEmail}
        />
      </div>

      <div className="sign-up-button-container">
        <Button buttonText="Create Account " 
          buttonAction={() => SubmitData(username, password, email)}
        />
      </div>

    </section>

  )
}

export default SignUp;