"use client"

import Link from "next/link";
import Section from "../Section";
import SkillCard from "../card/SkillCard";

const Skills = (): React.ReactNode => {
    return (
        <Section title="What can I do?" subtitle="Let's get down to brass tacks," name="skills">
            <div className="sm:grid grid-rows-2 grid-cols-2 gap-x-12">
                <SkillCard name="Frontend">Skilled in designing UI/UX interfaces, I&apos;ve learned many frameworks, such as React, Vue, Next.JS, and libraries, such as Three.JS and p5.js to create interesting frontends.</SkillCard>
                <SkillCard name="Backend">Experienced in both functional and OOP programming, I&apos;ve build backends with Rust, C, express.JS, PHP, and Node.JS.</SkillCard>
                <SkillCard name="Miscellaneous">Over the years I&apos;ve also learned other tools and languages to create new projects (most of which I liked, except Lua), like Git, Firebase, Processing, Java, SurrealDB, and OpenGL.</SkillCard>
            </div>
        </Section>
    )
}

export default Skills;