"use client"
import SignIn from "../components/SignIn";
import React, { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function App({ children }) {
    return (
        <GoogleOAuthProvider clientId="338947513955-v2qbsiuud0q0s09ppebq6c22re1qj935.apps.googleusercontent.com">
            <SignIn />
        </GoogleOAuthProvider>
    );
}