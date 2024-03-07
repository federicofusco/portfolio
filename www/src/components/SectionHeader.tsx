"use client"

import { HTMLAttributes } from "react";

interface SectionHeaderProps {
    children: React.ReactNode | string,
    href?: string,
}

const SectionHeader = ({ children, href, ...props }: SectionHeaderProps & HTMLAttributes<HTMLParagraphElement>): React.ReactNode => {
    return <p {...props} className={`${props.className} w-screen px-8 sticky z-50 -top-1 bg-transparent backdrop-blur-sm py-2 font-mono text-muted-foreground text-sm font-semibold`}>// { children }</p>
}

export default SectionHeader;