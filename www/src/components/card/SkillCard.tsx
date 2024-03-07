"use client"

import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { HTMLAttributes } from "react";

interface SkillCard {
    name: string,
    children: React.ReactNode,
}

const SkillCard = ({ name, children, ...props }: SkillCard & HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    return (
        <div {...props} className={cn("mt-6 sm:border sm:border-muted sm:flex sm:flex-col sm:items-start sm:mx-auto sm:p-4 sm:relative", props.className)}>
            <PlusIcon className="hidden sm:block absolute h-4 w-4 -top-2 -left-2 dark:text-white text-black" />
            <PlusIcon className="hidden sm:block absolute h-4 w-4 -top-2 -right-2 dark:text-white text-black" />
            <PlusIcon className="hidden sm:block absolute h-4 w-4 -bottom-2 -left-2 dark:text-white text-black" />
            <PlusIcon className="hidden sm:block absolute h-4 w-4 -bottom-2 -right-2 dark:text-white text-black" />

            <div className="bg-background py-2">
                <h4 className="font-mono">{ name }</h4>
            </div>
            
            <div className="flex">
                <span className="font-mono text-xs text-muted-foreground">&lt;</span>
                <span className="font-mono text-xs text-green-400">h3</span>
                <span className="font-mono text-xs text-muted-foreground">&gt;</span>
            </div>

            <blockquote className="border-l border-muted-foreground pl-4 ml-4">{ children }</blockquote>
            
            <div className="flex">
                <span className="font-mono text-xs text-muted-foreground">&lt;</span>
                <span className="text-xs text-muted-foreground">/</span>
                <span className="font-mono text-xs text-green-400">h3</span>
                <span className="font-mono text-xs text-muted-foreground">&gt;</span>
            </div>
        </div>
    )
}

export default SkillCard;