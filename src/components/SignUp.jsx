"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import "../styles/sign-up.css";


const InputField = ({fieldName, fieldPlaceHolder, type, fieldWidth, value, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <div className="sign-up-text" style={{ fontWeight: "bold", color: "white" }}>{fieldName}</div>
            <input 
                value={value} 
                placeholder={fieldPlaceHolder} 
                type={type === "password" && !showPassword ? "password" : "text"} // Toggle visibility
                onChange={onChange} 
                style={{ 
                    width: `${fieldWidth}`, 
                    height: "30px", 
                    borderRadius: "10px", 
                    paddingLeft: "10px", 
                    paddingRight: "35px" // Space for the eye icon 
                }} 
            />  
            {type === "password" && (
                <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ 
                        position: "absolute", 
                        right: "10px", 
                        top: "70%", 
                        transform: "translateY(-50%)",
                        background: "none", 
                        border: "none", 
                        cursor: "pointer",
                        color: "black"
                    }}
                >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            )}
        </div>
    );
}


function SignUp() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [firstName, enterFirstName] = useState("");
  const [lastName, enterLastName] = useState("");
  const [username, enterUsername] = useState("");
  const [password, enterPassword] = useState("");
  const [email, enterEmail] = useState("");


  // useEffect(() => {
  //   setIsClient(true);
  // }, [])

  // Redirect to sign-in page when "Have an account?" button is clicked.
  const handleSignIn = () => {
    router.push('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !password || !email) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3307/api/auth/signup', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        password: password.trim(),
        email: email.trim(),
      });

      if (response.status == 200) {
        console.log(response.data);
        console.log('Sign-up Successful!');
        router.push('/home');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Sign-up Error:", error);
      alert("An error occured while signing up. Please try again.");
    }
  }

  if (isClient) return null;

  return (
    <div>
        <div className="title-container">
          <div className="citrus-vine-title">Citrus Vine</div>
          <div className='sign-up-title'>Sign Up</div>
        </div>
        
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className='input-row'>
            <InputField 
                fieldName="First Name"
                type="text"
                id="firstNameEntry"
                className="input-text" 
                fieldPlaceHolder="ex: John" 
                value={firstName} 
                onChange={(e) => enterFirstName(e.target.value)}
            />
            <InputField 
                fieldName="Last Name"
                type="text"
                id="lasttNameEntry"
                className="input-text" 
                fieldPlaceHolder="ex: Doe" 
                value={lastName} 
                onChange={(e) => enterLastName(e.target.value)}
            />
          </div>
          <div className='input-row'>
            <InputField 
                fieldName="Username"
                type="text"
                id="userEntry"
                className="input-text" 
                fieldPlaceHolder="ex: DoeBoy_123" 
                value={username} 
                onChange={(e) => enterUsername(e.target.value)}
            />
            <InputField 
                fieldName="Password"
                type="password" 
                id="passwordEntry" 
                className="input-text" 
                fieldPlaceHolder="Enter here" 
                value={password} 
                onChange={(e) => enterPassword(e.target.value)}
            />
          </div>
          <div className='input-row'>
            <InputField 
                fieldName="Email"
                type="text" 
                id="emailEntry" 
                className="email-container" 
                fieldPlaceHolder="ex: jdoe001@ucr.edu" 
                fieldWidth="400px"
                value={email} 
                onChange={(e) => enterEmail(e.target.value)}
            />
          </div>
          <input 
              type="submit" 
              value="Sign Up" 
              className="sign-up-button"
          />
        </form>

        <div id="alt-sign-in">
          <button className="sign-up-button" onClick={handleSignIn}>Have have an account?</button>
        </div>
    </div>
  )
}

export default SignUp;