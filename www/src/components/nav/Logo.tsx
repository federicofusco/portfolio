"use client"

import Link from "next/link";

const Logo = (): React.ReactNode => {
    return (
        <Link href="/">
            <div className="h-16 w-16 flex">
                <div className="m-auto">
                    <span className="text-green-500 text-3xl font-black">_</span>
                    <span className="text-foreground text-3xl font-black">f</span>
                </div>
            </div>
        </Link>
    );
}

export default Logo;