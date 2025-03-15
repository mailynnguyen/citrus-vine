"use client"

import { Suspense } from "react"
import AccountSettings from "../../components/AccountSettings";

export default function SettingsPage() {
    return (
        <div>
            <Suspense>
                <AccountSettings/>
            </Suspense>
        </div>
    );
}

