import gsap from "gsap"; // Import GSAP for animations
import { useGSAP } from "@gsap/react"; // Custom hook for using GSAP with React
import { ScrollTrigger } from "gsap/all"; // Import ScrollTrigger plugin from GSAP for scroll-based animations

import AnimatedTitle from "./AnimatedTitle"; // Import AnimatedTitle component to display the animated title

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // useGSAP hook for handling GSAP animations
  useGSAP(() => {
    // Create a GSAP timeline animation for the element with the id `#clip`
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip", // Target element is the div with id="clip"
        start: "center center", // Animation starts when the center of the trigger reaches the center of the viewport
        end: "+=800 center", // Animation ends 800px after the start point
        scrub: 0.5, // Smooth animation scrubbing as you scroll
        pin: true, // Pin the trigger element during animation
        pinSpacing: true, // Enable spacing after the pin is released
      },
    });

    // Animation applied to `.mask-clip-path` element
    clipAnimation.to(".mask-clip-path", {
      width: "100vw", // Animate width to 100% of the viewport width
      height: "100vh", // Animate height to 100% of the viewport height
      borderRadius: 0, // Set border-radius to 0 to remove rounded corners
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* Main container for the "About" section */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Intro text */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </p>

        {/* AnimatedTitle component renders a dynamic title with styling */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* Subtext explaining what Zentry is */}
        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      {/* This section contains the animation-triggered clipping effect */}
      <div className="h-dvh w-screen" id="clip">
        {/* Mask for the image clipping animation */}
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp" // Background image for the "About" section
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About; // Export About component for use elsewhere in the application
