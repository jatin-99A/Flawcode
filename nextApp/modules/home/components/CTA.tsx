"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const CTA = () => {
    const router = useRouter();
    return (
        <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Building Skills That Matter
            </h2>
            <p className="text-xl text-white/90 mb-8">
                Join thousands of developers leveling up through consistent practice
                and intelligent learning.
            </p>
            <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg cursor-pointer"
                onClick={() => router.push("/problem")}
            >
                Start For Free
            </Button>
        </div>
    )
}

export default CTA