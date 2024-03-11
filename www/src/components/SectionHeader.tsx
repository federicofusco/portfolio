"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionHeaderProps {
    children: React.ReactNode | string,
    href?: string,
}

const SectionHeader = ({ children, href, ...props }: SectionHeaderProps & HTMLAttributes<HTMLParagraphElement>): React.ReactNode => {
    return <h2 {...props} className={cn("w-screen px-8 sticky z-50 -top-1 bg-transparent backdrop-blur-sm py-2 font-mono text-muted-foreground text-sm font-semibold", props.className)}>&#47;&#47; { children }</h2>
}

export default SectionHeader;