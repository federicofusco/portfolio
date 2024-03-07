"use client"

import { useState } from "react";
import Code from "../Code";
import CodeInput from "../CodeInput";
import GradientText from "../GradientText";
import Boids from "../interactive/Boids";
import DotBackground from "../DotBackground";

const Hero = (): React.ReactNode => {
    const initalAdjective: string = "awesome";
    const [adjective, setAdjective] = useState<string | undefined>(initalAdjective);


    return <section className="w-screen h-screen pt-[104px] px-8">
        <DotBackground className="w-full h-full absolute -z-10 top-0 left-0">
            <Boids />
        </DotBackground>

        <Code className="text-sm">
            hello();<br />
            let adjective = "<CodeInput onValueChange={setAdjective} defaultValue={initalAdjective} />";
        </Code>

        <br />

        <h1 className="text-4xl sm:text-7xl md:text-8xl font-black mt-8">
            Bringing <GradientText>{ adjective && adjective.length > 0 ? adjective : "fun" }</GradientText><br />
            ideas to life.
        </h1>
    </section>;
}

export default Hero;