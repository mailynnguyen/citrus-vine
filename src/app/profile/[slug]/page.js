import ProfileHeader from "@/components/ProfileHeader";
import GridPosts from "@/components/GridPosts";

import { Suspense } from "react"

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
            <Suspense>
                <ProfileHeader id={slug}></ProfileHeader>
                <GridPosts id={slug}></GridPosts>
            </Suspense>
        </div>

    )
}