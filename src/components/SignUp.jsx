"use client";
import "../styles/sign-up.css";

// React
import { useState } from 'react'
import { User } from "lucide-react";

// Images
import PusheenImage from "../images/pusheen-background-upscaled-dimmed.png"
import CitrusVineLogo from "../images/BearCutie Logo.svg"

// DB
import { UsersInsertForward, UsersCheckUsernameExists} from "@/app/paths";
import axios from "axios";


const InputField = ({fieldName, fieldPlaceHolder, fieldWidth, setUsername, setPassword, setEmail}) => {

  const [fieldValue, setFieldValue] = useState("")
  const onFieldValueChange = event => {
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
  const onHover = event => {
    //Change button color
  }
  return (
    <div>
      <button onClick={buttonAction} className="sign-up-button">{buttonText}</button>
    </div>
  )
}

const SubmitData = (username, password, email) => {
  // Verifying data
  // Entering data into database
  // Alert: Congratulations you have an account notif

  /*
      Prevent alert spam on refresh by having this base case exist.
  */
  if (username == "" || password == "" || email == "") {
    return;
  }

  /*
      Checks whether the username specified already exists. UserID is primary
      key but it would also just be weird for two accounts to have the same 
      username.
  */
  // var existence_json = {
  //   "Username": `${username}`
  // }
  // console.log("existence_json: ", existence_json)

  // const CheckExists = async (username) => {
  //   try{
  //     return await axios.get(`http://localhost:3307/UsersQuery/Exists/${username}`)
  //   }
  //   catch (err) {
  //     console.log("Error: ", err)
  //   }
  // }    
  // CheckExists(username)
  //   .then((result) => {

  //     const does_username_exist = result.data[0].Existence
  //     if (does_username_exist) {
  //       alert("Invalid username. Username already exists!")
  //     }
  //     else {
  //       console.log("Valid username!")
  //     }
  //   })

  const CheckExists = async (username) => {
    try{
      var result = await axios.post(UsersCheckUsernameExists, {"Username": `\'${username}\'`})
      console.log("try result: ", result)
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

  // console.log("Exists check: ", does_username_already_exist.then(result))
  // async function CheckUsernameExists(ex_json) {
  //   try {
  //     var res = axios.post(UsersCheckUsernameExists, existence_json)
  //     console.log("res: ", res)
  //   }
  //   catch(err) {
  //     console.log("Error: ", err)
  //   }
  // }


  // does_username_already_exist = CheckUsernameExists()
  // console.log("does: ", does_username_already_exist)

  


  /*
      Preparing information for submission. Is very nice to structure
      everything in a nice json-like variable.
  */
  // var submission_json = {
  //   "Username": `\'${username}\'`, 
  //   "Password": `\'${password}\'`,
  //   "Email": `\'${email}\'`
  // }
  // var submission_result = axios.post(UsersInsertForward, {submission_json})
  // console.log("submission_result: ", submission_result)

  
  // var does_username_exist_now = axios.post(UsersCheckUsernameExists, existence_json)
  // if (!does_username_exist_now) {
  //   alert("Unsuccessful account creation! Please make sure all fields are correctly filled!")
  // }
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
          buttonAction={SubmitData(username, password, email)}
        />
      </div>

    </section>

  )
}

export default SignUp;