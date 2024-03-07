"use client"

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { HTMLAttributes } from "react";

const InlineSocials = ({...props}: HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    return (
        <div {...props} className={`${props.className} flex`}>
            <Link target="_blank" href="https://www.instagram.com/federicofusco0">
                <InstagramLogoIcon className="h-5 w-5 mr-2" />
            </Link>
            <span>/</span>
            <Link target="_blank" href="https://www.github.com/federicofusco">
                <GitHubLogoIcon className="h-5 w-5 ml-2" />
            </Link>
        </div>
    )
}

export default InlineSocials;