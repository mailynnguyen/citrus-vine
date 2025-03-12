"use client"

import Button from "@/components/Button";
import "@/styles/profile_header.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileHeader = ({ id }) => {
    const [userInfo, setUserInfo] = useState({})

    useEffect( () => {
        const fetchUser = async() => {
            try {
                const {data} = await axios.post(`http://localhost:3307/Users/FetchOnID`, {UserID: id});

                console.log(data)
                setUserInfo(data[0])
            } catch (err) {
                console.log(err)
            }//data[0].Bio
        };

        fetchUser();
    }, [])

    return (
        <div className="profile-header">

            {/* Temp Profile Pic*/}
            <img src={"/" + userInfo.AssignedProfilePic} className="profile-pic"></img>

            <div className="display-bio-holder">
                <p className="display-name">{userInfo.Username}</p>
                <p className="header-bio">{userInfo.Bio}</p>
            </div>
            

            <div className="profile-button-holder">
                <Button title="Follow" />
                <Button title="Message" />
                <Button title="Report" />
            </div>
            
        </div>
    )
}

export default ProfileHeader;