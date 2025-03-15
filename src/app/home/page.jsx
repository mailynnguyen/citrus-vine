"use client"

import { Suspense } from "react"
import Feed from "../../components/Feed";

export default function App() {
    return (
        <div>
            <Suspense>
                <Feed />
            </Suspense>
        </div>
    );
}