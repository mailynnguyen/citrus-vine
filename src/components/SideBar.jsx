
import Button from "./Button";
import { LogOut } from "lucide-react";
import "@/styles/side_bar.css";

import axios from "axios";
import { UsersValidateAccount } from "@/app/paths";
import { UsersLogout } from "@/app/paths";



const SideBar = ({ onClick }) => {
    const ClickLogout = async() => {
        try{
            console.log("clicked button")
            const result = await axios.post(UsersLogout, {}, {withCredentials: true});
            console.log("logggggged off")
        } catch (err){
            console.log("Error: ", err)
        }
    }

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


                    {/*  need to add the reroute to sign in page  */}
                    </div>

                <div id="side-bar-buttons">  
                    <Button title="Edit Profile" /> 
                    <Button title="Create a Post" onClick={onClick} />
                </div>

                <div id="divisor" />

            </div>

            <div id="bottom">

            </div>
            
            
        </div>
    )
}

export default SideBar;