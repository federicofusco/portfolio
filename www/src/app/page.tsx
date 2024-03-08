import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

const Home = (): React.ReactNode => {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Projects />
        </>
    );
}

export default Home;
