"use client"

import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";
import Section from "../Section";

const About = (): React.ReactNode => {
    return (
        <Section title="Hey! I'm Federico," name="about">
            <p className="mt-2">
                currently a {new Date().getFullYear() - 2007} year old highschool student based in Milan, IT. 
                For the past {new Date().getFullYear() - 2016}+ years I&apos;ve been culminating a passion for web and software development.
                Since 2020 I&apos;ve been focused on creating more impactful and maintainable projects, while also participating
                in local and national hackathons.
            </p>

            <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/projects">
                    <ArrowRightIcon className="mr-2" />
                    Check out my work
                </Link>
            </Button>
        </Section>
    )
}

export default About;