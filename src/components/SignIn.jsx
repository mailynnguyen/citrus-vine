"use client"
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Search } from "lucide-react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '@/styles/sign-in.css';
import { UsersFetchAll } from "@/app/paths";


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
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    );
}


function SignIn() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [username, enterUsername] = useState("");
    const [password, enterPassword] = useState("");



    useEffect(() => {
        setIsClient(true); // Mark as client-side rendered after initial render
    }, []);


    const googleLogin = async (userData) => {
        console.log("UserData:", userData);
        try {
            const saveUserResponse = await axios.post('http://localhost:3307/api/auth/googleSignIn', userData);
            console.log('Save user response:', saveUserResponse);

            if (saveUserResponse.status === 200) {
                console.log(saveUserResponse.data);
                console.log('Google sign-in successful!');
                router.push('/home');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred while signing in with Google. Please try again.");
            }
        }
    }

    // Redirect to sign-up page when "Dont have an account?" button is clicked.
    const handleSignUp = () => {
        router.push('/signUp');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3307/api/auth/signin', {
                username: username.trim(),
                password: password.trim(),
            });

            if (response.status === 200) {
                console.log(response.data);
                console.log("Sign-in Successful!");
                router.push('/home');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred while signing in. Please try again.");
            }
        }
    }

    if (!isClient) return null;

    return (
        <>
            <div className="citrus-vine-text">Citrus Vine</div>
            <div className="sign-in-text">Sign In</div>

            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="input-row">
                    <InputField 
                        fieldName="Username"
                        type="text"
                        id="userEntry"
                        className="input-text" 
                        fieldPlaceHolder="Enter username here" 
                        value={username} 
                        onChange={(e) => enterUsername(e.target.value)}
                    />
                    <InputField 
                        fieldName="Password"
                        type="password"
                        id="userEntry"
                        className="input-text" 
                        fieldPlaceHolder="Enter password here" 
                        value={password} 
                        onChange={(e) => enterPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Sign In" 
                    className="sign-in-button">
                </input>
            </form>

            <div className="line-with-text">
                <span className="line-text">OR</span>
            </div>

            <div className='button-container'>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                        // console.log(credentialResponseDecoded);
                        const userData = {
                            email: credentialResponseDecoded.email,
                            name: credentialResponseDecoded.name,
                            picture: credentialResponseDecoded.picture,
                            given_name: credentialResponseDecoded.given_name,
                            family_name: credentialResponseDecoded.family_name,
                        };

                        googleLogin(userData);
                    }}
                    onError={() => {
                        console.log('Google Login Failed');
                    }}
                />
            </div>
            
            <div id="alt-sign-in">
                <button className="sign-in-button" onClick={handleSignUp}>Don't have an account?</button>

                <button className="sign-in-button">Forgot password?</button>
            </div>
        </>
    )
}

export default SignIn;