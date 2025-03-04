"use client";
import "../styles/sign-up.css";

import { useState } from 'react'

import PusheenImage from "../images/pusheen-background-upscaled-dimmed.png"
import CitrusVineLogo from "../images/BearCutie Logo.svg"


// const PageBackground = (img) => {
//   const [backgroundValue, setBackgroundValue] = useState(`url(${img})`)
//   return (
//     <div body = {{
//       backgroundImage: backgroundValue,
//       backgroundSize: "cover",
//       backgroundRepeat: "repeat",
//       backgroundPosition: "center",
//       minHeight: "100vh"
//     }}>
//     </div>
//   )
// }

const InputField = ({fieldName, fieldPlaceHolder, fieldWidth}) => {

  const [fieldValue, setFieldValue] = useState("")
  const onFieldValueChange = event => {
    setFieldValue(event.target.value)
  }
  return (
    <div class="input-field" style={{width:`${fieldWidth}`}}>
      <div className="sign-up-text">{fieldName}</div>
      <input value={fieldValue} placeholder={fieldPlaceHolder} type="text" onChange={onFieldValueChange} class= "sign-up-input" /*style={{width:`${fieldWidth}`, height:"30px", borderRadius:"10px", paddingLeft:"10px"}}*/ />  
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

const SubmitData = () => {
  // Verifying data
  // Entering data into database
  // Alert: Congratulations you have an account notif
}

const SignUp = () => {

  return (

    <body id="sign-up-background" style ={{backgroundImage: `url(${PusheenImage.src})`}}>

        
        <div class="sign-up-title">Sign Up</div><br></br>
        <img src={CitrusVineLogo.src} class="sign-up-citrus-vine-logo"></img>
        
        
        
        <div className="sign-up-field-container">
          <InputField fieldName="First Name" fieldPlaceHolder="Enter first name..."/>
          <InputField fieldName="Last Name" fieldPlaceHolder="Enter last name..."/>
          <InputField fieldName="Username" fieldPlaceHolder="Enter user name..."/>
          <InputField fieldName="Password" fieldPlaceHolder="Enter password..."/>
          <InputField fieldName="Email" fieldPlaceHolder="Enter email..." fieldWidth="100%"/>
        </div>

        <div className="sign-up-button-container">
          <Button buttonText="Create Account " buttonAction={SubmitData}></Button>
        </div>

    </body>

  )
}

export default SignUp;