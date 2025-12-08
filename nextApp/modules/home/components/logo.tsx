"use client"

import { CodeXml } from "lucide-react"
import { useEffect, useRef } from "react"


const Logo = () => {
    const iconRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
        let rotated = false;
        const intervalId = setInterval(() => {
            if (iconRef.current) {
                iconRef.current.style.rotate = rotated ? "0deg" : "180deg";
                rotated = !rotated;
            }
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);



    return (
        <div className="flex gap-2 ">
            <CodeXml ref={iconRef} size={35} className="text-[#3d0ef6] relative bottom-1.5 ease-in duration-500 mx-1.5" />
            <h1 className="font-extrabold lg:text-[1.4rem] relative -top-2 lg:-top-3 ">Flaw<span className="text-[#3d0ef6] text-3xl lg:text-4xl relative bottom-[-0.1rem] mx-0.5">C</span>ode</h1>
        </div>
    )
}

export default Logo