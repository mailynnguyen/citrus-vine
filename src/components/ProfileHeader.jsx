import Button from "@/components/Button";
import "@/styles/profile_header.css";

const ProfileHeader = () => {
    return (
        <div class="profile-header">

            {/* Temp Profile Pic*/}
            <div class="profile-pic"></div>

            <div class="display-bio-holder">
                <p class="display-name">IEatDogFood</p>
                <p class="header-bio">I am dog. I eat dog food and occasionally my owner’s food. My owner loves me very much. I am a good doggo.</p>
            </div>
            

            <div class="profile-button-holder">
                <Button title="Follow" />
                <Button title="Message" />
                <Button title="Report" />
            </div>
            
        </div>
    )
}

export default ProfileHeader;