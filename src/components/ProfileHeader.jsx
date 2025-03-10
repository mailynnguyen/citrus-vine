import Button from "@/components/Button";
import "@/styles/profile_header.css";

const ProfileHeader = () => {
    return (
        <div className="profile-header">

            {/* Temp Profile Pic*/}
            <div className="profile-pic"></div>

            <div className="display-bio-holder">
                <p className="display-name">IEatDogFood</p>
                <p className="header-bio">I am dog. I eat dog food and occasionally my owner’s food. My owner loves me very much. I am a good doggo.</p>
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