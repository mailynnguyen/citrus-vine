"use client";  
import Button from "./Button";
import { LogOut } from "lucide-react";
import "@/styles/side_bar.css";
import axios from "axios";
import { UsersLogout } from "@/app/paths";
import { useRouter } from 'next/navigation'; 

const SideBar = ({ onClick }) => {
    const router = useRouter(); 

    const ClickLogout = async () => {
        try {
            console.log("clicked button");
            //await axios.post(UsersLogout, {}, { withCredentials: true });
            console.log("logged off");
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const handleEditProfile = () => {
        console.log("Navigating to /settings..."); 
        router.push('/settings'); 
    };

    return (
        <div id="section">
            <div id="top">
                <div id="profile">
                    <div id="profile-pic" />
                    <p id="display-name">Katie</p>
                    <div id="log-out-container" onClick={ClickLogout}>
                        <LogOut 
                            id="log-out" 
                            color="#C9C9C9" 
                            size={36} 
                            strokeWidth={3} 
                        />
                    </div>
                </div>

                <div id="side-bar-buttons">  
                    <button type="button" id="edit-profile-button" onClick={handleEditProfile}>
                        Edit Profile
                    </button>
                    <Button title="Create a Post" onClick={onClick} />
                </div>
                <div id="divisor" />
            </div>

            <div id="bottom"></div>
        </div>
    );
};

export default SideBar;
