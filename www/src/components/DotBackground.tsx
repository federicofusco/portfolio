"use client"

import { HTMLAttributes } from "react";

interface DotBackgroundProps {
    children: React.ReactNode,
}

const DotBackground = ({ children, ...props }: DotBackgroundProps & HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    return (
        <div {...props} className={`${props.className ? props.className : ""} bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center`}>
            { children }
        </div>
    )
}

export default DotBackground;