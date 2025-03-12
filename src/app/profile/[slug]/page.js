import ProfileHeader from "@/components/ProfileHeader";
import GridPosts from "@/components/GridPosts";

import GridPost from "@/components/GridPost";

export async function generateStaticParams() {
    const users = await fetch('http://localhost:3307/Users/FetchAll').then((res) => res.json())
   
    return users.map((user) => ({
      UserID: user.UserID,
    }))
}

export default async function Page({ params }) {
    const {slug} = await params

    return(
        {slug} && 
        <div>
            <ProfileHeader id={slug}></ProfileHeader>
            <GridPosts id={slug}></GridPosts>
        </div>

    )
}