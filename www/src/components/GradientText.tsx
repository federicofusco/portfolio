"use client"

import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react";

interface GradientTextProps {
    children: React.ReactNode,
    from?: string,
    via?: string,
    to?: string,
}

const GradientText = ({ children, from, via, to, ...props}: GradientTextProps & HTMLAttributes<HTMLSpanElement>): React.ReactNode => {
    return (
        <span className={cn("font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600", props.className)} {...props}>
            { children }
        </span>
    );
}

export default GradientText;