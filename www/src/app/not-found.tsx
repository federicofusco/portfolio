"use client"

import DotBackground from "@/components/DotBackground";
import Boids from "@/components/interactive/Boids";
import Link from "next/link";

const NotFound = (): React.ReactNode => {
    return (
        <div className="w-screen h-[calc(100vh-64px)]">
            <DotBackground className="w-full h-full absolute -z-10 top-0 left-0">
                <Boids />
            </DotBackground>

            <div className="absolute tranform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-5xl font-black font-mono text-center text-foreground">404</h1>
                <span className="font-sans text-center text-foreground">
                    We couldn&apos;t find what you were looking for.<br />
                    Let&apos;s bring you back <Link href="/" className="font-bold text-foreground link-underline font-mono">Home</Link>
                </span>
            </div>  
        </div>
    )
}

export default NotFound;