"use client"

import Link from "next/link";
import Logo from "./Logo";
import InlineSocials from "./InlineSocials";
import Copyright from "./Copyright";
import { Separator } from "../ui/separator";
import Dino from "../interactive/Dino";

const Footer = (): React.ReactNode => {
    return (
        <footer className="w-screen bg-background border-t px-4">
            <div className="my-4">

                <div className="w-full flex justify-between mb-2">
                    <Logo />

                    <Copyright className="sm:hidden text-right my-auto font-mono text-muted-foreground text-xs mr-4" />

                    <div className="hidden my-auto font-mono w-full font-semibold text-foreground sm:flex justify-end p-4">
                        <Link href="/projects" className="mr-12">Projects</Link>
                        <Link href="/resume" className="mr-12">Resume</Link>
                        <Link href="https://blog.federicofusco.dev/?utm=web_footer" className="mr-12">Blog</Link>
                        <Link href="/about" className="mr-12">About</Link>
                    </div>
                </div>

                <Separator />

                <div className="sm:hidden my-auto font-mono w-full font-semibold text-foreground flex justify-between p-4">
                    <Link href="/projects">Projects</Link>
                    <Link href="/resume">Resume</Link>
                    <Link href="https://blog.federicofusco.dev/?utm=web_footer">Blog</Link>
                    <Link href="/about">About</Link>
                </div>

                <div className="hidden sm:flex py-4">
                    <Copyright className="w-full font-mono text-muted-foreground ml-4 text-sm" />
                
                    <Dino />
                </div>

            </div>
        </footer>
    )
}

export default Footer;