"use client";
import React, {useState} from "react";
import axios from "axios";
import "@/styles/accountsettings.css"
import { UsersChangeUsername, UsersGetUsername, UsersSession } from "@/app/paths";

const AccountSettings = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");

    const handleLogout = () => {
        console.log("Logging out...");
        // Call logout API here
    };

    const handleDeleteAccount = () => {
        console.log("Deleting account...");
        //
    };

    const handleChangeEmail = () => {
        console.log("Changing email to:", email);
        // Call API to change email
    };

    const handleChangeUsername = async (use) => {
        try {
            console.log("Changing username to:", use);
            
            // Fetch User ID
            //const idResponse =  await axios.get(UsersSession, { withCredentials: true });
            //const userID = idResponse.data.UserID;
            
            // Change Username
            //const result = await axios.post(UsersChangeUsername, {
            //    UserID: userID,
            //    Use: use
            //});
    
            //console.log("Username changed successfully:", result.data);
        } catch (error) {
            console.error("Error changing username:", error);
        }
    };    

    const handleChangePassword = () => {
        console.log("Changing password...");
        // Call API to change password
    };

    return (
        <div className="account-settings">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Account Options</h3>
                <h3>Accessibility</h3>
            </div>

            {/* Main Settings Panel */}
            <div className="settings-panel">
                <h2>Account Settings</h2>

                {/* Email */}
                <div className="setting-row">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleChangeEmail}>Change Email</button>
                </div>

                {/* Username */}
                <div className="setting-row">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={() => handleChangeUsername(username)}>
                        Change User
                        </button>
                </div>

                {/* Password */}
                <div className="setting-row">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleChangePassword}>Change Pass</button>
                </div>

                {/* Description */}
                <div className="setting-row">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button>Change Bio</button>
                </div>

                {/* Account Options */}
                <div className="account-options">
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="delete-btn" onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
