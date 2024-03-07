"use client"

import { World } from "@/lib/boids";
import { useEffect, useRef } from "react";

const Boids = (): React.ReactNode => {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        // Initializes three.js only if running on the client
        if (typeof window === "undefined") return;

        // Creates the flock
        const world = new World(window.innerWidth / 2, canvas);

        document.addEventListener("mousemove", (event: MouseEvent) => world.mouseMove(event));

        // Renders the scene
        const renderScene = () => {
            world.update();
            requestAnimationFrame(renderScene);
        };
          
        // Call the renderScene function to start the animation loop
        renderScene();
    }, []);

    return (
        <>
            <canvas className="h-full w-full" ref={canvas}></canvas>
        </>
    );
}

export default Boids;