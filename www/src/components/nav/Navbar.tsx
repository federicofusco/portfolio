"use client"

import Logo from "@/components/nav/Logo";
import ThemeSelector from "./ThemeSelector";
import Socials from "./Socials";

const Navbar = (): React.ReactNode => {
    return <nav className="w-screen bg-transparent z-1000 border-b sticky top-0 left-0 backdrop-blur-sm flex justify-between">
        <Logo />

        <div className="my-auto mr-4 flex">
            <Socials />
            <ThemeSelector />
        </div>
    </nav>
}

export default Navbar;