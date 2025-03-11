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

  var textConfig = "sign-up-input"
  if (fieldValue != "") {
    console.log("Filled")
    textConfig = "sign-up-input-filled"
  } 
  else {
    console.log("Unfilled")
  }
  
  const onFieldValueChange = (event) => {
    var value = event.target.value
    setFieldValue(event.target.value)
    if (fieldName == "Username") {setUsername(value)}
    if (fieldName == "Password") {setPassword(value)}
    if (fieldName == "Email") {setEmail(value)}
  }

  return (
    <div className="input-field" style={{width:`${fieldWidth}`}}>
      <div className="sign-up-text">{fieldName}</div>

      <input 
        value={fieldValue} 
        placeholder={fieldPlaceHolder} 
        type="text" 
        onChange={onFieldValueChange} 
        className={textConfig}/>  

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
  var doesExist = {"exists": false}
  const CheckExists = async (username, doesExist) => {
    try{
      var result = await axios.post(UsersCheckUsernameExists, {"Username": `\'${username}\'`})
      console.log("[CheckExists] result: ", result)
      doesExist.exists = result.data[0].Existence
      return result;
    }
    catch (err) {
      console.log("Error: ", err)
    }
  }    


  /*
      Preparing information for submission. Is very nice to structure
      everything in a nice json-like variable.
  */
  const AddAccount = async (username, password, email) => {
    try {
      var rand = Math.floor(Math.random() * (3 - 1)) + 1
      var pic;

      if(rand == 1) {
        pic = 'lemon-pfp.svg'
      } else if (rand == 2) {
        pic = 'lime-pfp.svg'
      } else {
        pic = 'orange-pfp.svg'
      }

      var submission_json = {
        "Username": `\'${username}\'`, 
        "Password": `\'${password}\'`,
        "Bio": `\'Hey I\\'m ${username}!\'`,
        "Email": `\'${email}\'`,
        "Pfp": pic,
      }
      var result = await axios.post(UsersInsertForward, submission_json)
      console.log("[AddAccount] result: ", result)
      return result;
    }
    catch (err) {
      console.log("Error: ", err)
    }
  }

  CheckExists(username, doesExist)
    .then((result) => {

      console.log("result: ", result.data[0].Existence)
      const does_username_exist = result.data[0].Existence;
      doesExist = result.data[0].Existence
      if (does_username_exist) {
        alert("Invalid username. Username already exists!")
      }
      else {
        console.log("Valid username!")

        AddAccount(username, password, email)
          .then((result) => {
            console.log("Successful account creation!", result)
          })
      }
    })
}

const SignUp = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

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
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
        />
        <InputField fieldName="Password" 
          fieldPlaceHolder="Enter password..."
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
        />
        <InputField fieldName="Email" 
          fieldPlaceHolder="Enter email..." 
          fieldWidth="100%"
          setUsername={setUsername}
          setPassword={setPassword}  
          setEmail={setEmail}
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