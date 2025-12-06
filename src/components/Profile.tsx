'use client'
import { useSession } from "next-auth/react"
export default function Profile() {
    const session = useSession();
    if (session.data?.user) {
        return <div>
            User is Signed in from Client
        </div>
    }
    else {
        return <div>
            User is Signed Out from Client
        </div>
    }
}