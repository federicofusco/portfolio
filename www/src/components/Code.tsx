"use client"

import { cn } from "@/lib/utils";

interface CodeProps {
    children: React.ReactNode,
}

const Code = ({ children, ...props }: CodeProps & React.HTMLAttributes<HTMLSpanElement>): React.ReactNode => {
    return <span {...props} className={cn("font-mono text-slate-500 text-lg", props.className)}>{ children }</span>;
}

export default Code;