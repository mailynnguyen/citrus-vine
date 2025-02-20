import Button from "@/components/Button";
import "@/styles/profile_header.css";

const ProfileHeader = () => {
    return (
        <div id="section">

            {/* Temp Profile Pic*/}
            <div id="profile-pic"></div>

            <div id="display-bio">
                <p id="display-name">IEatDogFood</p>
                <p id="bio">I am dog. I eat dog food and occasionally my owner’s food. My owner loves me very much. I am a good doggo.</p>
            </div>
            

            <div id="buttons">
                <Button title="Follow" />
                <Button title="Message" />
                <Button title="Report" />
            </div>
            
        </div>
    )
}

export default ProfileHeader;