"use client"

import { ArrowBottomRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    name: string,
    description: string,
    repo: string,
    href?: string
}

const ProjectCard = ({ name, description, repo, href, ...props }: ProjectCardProps & HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    return (
        <div {...props} className={cn("z-10 max-w-lg relative mb-4 shadow-xl bg-transparent border p-4 overflow-hidden rounded-2xl flex flex-col justify-end items-start", props.className)}>
          
            <div className="flex">
                <div className="m-auto h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center">
                    <ArrowBottomRightIcon className="w-3 h-3 text-muted-foreground" />
                </div>

                <h1 className="ml-2 my-auto font-bold text-lg text-foreground font-mono relative">{ name }</h1>
            </div>

            <p className="font-normal text-base text-muted-foreground mb-4 relative">{ description }</p>

            <div className="w-full flex">
                { href && <Button variant="outline" className="w-full mr-2" asChild>
                    <Link href={href}>
                        Explore
                    </Link>
                </Button> }
                
                <Button variant="outline" size="icon" title="View source" asChild>
                    <Link href={repo}>
                        <GitHubLogoIcon className="h-5 w-5 m-2" />
                    </Link>
                </Button>
            </div>

          {/* <button className="border px-4 py-1 rounded-lg border-foreground-muted text-gray-300">
            Explore
          </button> */}

          {/* Meaty part - Meteor effect */}
          {/* <Meteors number={10} /> */}
        </div>
    )
}

export default ProjectCard;