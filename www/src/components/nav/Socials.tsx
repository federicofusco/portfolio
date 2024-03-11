"use client"

import { Button } from "../ui/button";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Socials = (): React.ReactNode => {
    return (
        <>
            <Button variant="ghost" title="Instagram" size="icon">
                <Link target="_blank" title="Instagram" href="https://www.instagram.com/federicofusco0">
                    <InstagramLogoIcon className="h-5 w-5 m-auto" />
                </Link>
            </Button>

            <Button variant="ghost" title="GitHub" size="icon">
                <Link target="_blank" title="GitHub" href="https://www.github.com/federicofusco">
                    <GitHubLogoIcon className="h-5 w-5 m-auto" />
                </Link>
            </Button>
        </>
    )
}

export default Socials;