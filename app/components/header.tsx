'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation" 
import { useDescope } from "@descope/react-sdk"

export function Header() {
    const router = useRouter();
    const { logout } = useDescope();

    const handleLogout = async () => {
        console.log("Logging out...")
        await logout();
        router.push('/login')
    }

    return (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>
    </header>
  )
}

