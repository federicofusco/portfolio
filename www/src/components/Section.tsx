"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import SectionHeader from "./SectionHeader";

interface SectionProps {
    name: string,
    subtitle?: string,
    title?: string,
    children: React.ReactNode,
}

const Section = ({ name, subtitle, title, children, ...props }: SectionProps & HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    return (
        <section {...props} className={cn("my-8 w-full", props.className)}>
            <SectionHeader>{ name }</SectionHeader>

            <div className="mx-8">
                { subtitle && <p className="mt-4 text-xs text-muted-foreground">{ subtitle }</p> }
                { title && <h3 className="text-xl">{ title }</h3> }

                { children }
            </div>
        </section>
    )
}

export default Section;