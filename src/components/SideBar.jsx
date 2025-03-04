
import Button from "./Button";
import { LogOut } from "lucide-react";
import "@/styles/side_bar.css";

const SideBar = ({ onClick }) => {

    return (
        <div id="section">

            <div id="top">

                <div id="profile">
                    <div id="profile-pic" /> 
                    <p id="display-name">Katie</p>
                    <LogOut id="log-out" color="#C9C9C9" size={36} strokeWidth={3} />
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