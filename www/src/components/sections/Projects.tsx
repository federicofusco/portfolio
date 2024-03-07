"use client"

import Link from "next/link";
import ProjectCard from "../card/ProjectCard";
import Section from "../Section";
import { Button } from "../ui/button";
import { TracingBeam } from "../ui/tracing-beam";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const Projects = (): React.ReactNode => {
    return (
        <Section title="What have I built?" subtitle="Enough technical talk," name="projects">
            <div className="w-full mt-2 flex">
                <TracingBeam className="pl-12">
                    {/* <div className="ml-12"> */}
                        <ProjectCard href="https://solarize.federicofusco.dev/" repo="https://www.github.com/federicofusco/solarize" name="Solarize" description="Developed in 36 hours, this website allows users to access NASA's satellite data to help them place solar panels. This won the 2022 Nasa Space Apps Challenge at Brescia." />
                        <ProjectCard repo="https://www.github.com/overslight/auth" name="Overslight Auth" description="A custom authentication API and SDK written in Rust that supports Google, GitHub, Twitter, and Facebook Oauth2 while maintaining traditional login methods like Email/Password." />
                        <ProjectCard href="https://docs.federicofusco.dev/" repo="https://www.github.com/federicofusco/docs" name="Docs" description="An online, cloud-based document editor that supports live collaboration and the ability to add custom plugins." />
                        <ProjectCard href="https://www.ecomentality.life" repo="https://www.github.com/federicofusco/ecomentality.it" name="Ecomentality" description="A website I create in collaboration with the GEM team at Brescia, it won the regional HUBSTEAM competition back in 2022" />
                        <Button variant="outline" className="w-full max-w-lg" asChild>
                            <Link href="/projects">
                                <ArrowRightIcon className="mr-2" />
                                View all
                            </Link>
                        </Button>
                    {/* </div> */}
                </TracingBeam>
            </div>
        </Section>
    )
}

export default Projects;