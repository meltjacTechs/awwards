import gsap from "gsap";  // Importing GSAP (GreenSock Animation Platform) for animations.
import { useGSAP } from "@gsap/react";  // Importing a custom hook `useGSAP` from `@gsap/react` to interact with GSAP in a React-friendly way.
import ScrollTrigger from "gsap/all";  // Importing all the GSAP plugins, including `ScrollTrigger`, which allows animations to be triggered based on scroll position.
import AnimatedTitle from "./AnimatedTitle";  // Importing a custom component for displaying animated titles.
 
gsap.registerPlugin(ScrollTrigger);  // Registering the `ScrollTrigger` plugin to enable scroll-based animations in GSAP.

const About = () => {
  // The About component contains animations triggered by scroll events.
  
  useGSAP(() => {
    // Inside the `useGSAP` hook, we define a GSAP animation that interacts with scroll events.
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",  // The element that will trigger the animation (in this case, the element with id `clip`).
        start: "center center",  // The scroll position where the animation should start (the center of the screen and the center of the trigger element).
        end: "+=800 center",  // The scroll position where the animation should end (800px after the trigger element reaches the center).
        scrub: 0.5,  // Smoothly scrubs the animation based on the scroll position (0.5 means it's tied to the scroll but a bit delayed).
        pin: true,  // This keeps the `#clip` element pinned in place while the animation runs.
        pinSpacing: true,  // This ensures the content after the pinned element will continue to flow correctly while pinned.
      }
    });

    // This `clipAnimation` animates the `.mask-clip-path` class:
    clipAnimation.to('.mask-clip-path', {
      width: '100vw',  // Sets the width of the `.mask-clip-path` element to 100% of the viewport width.
      height: '100vh',  // Sets the height of the `.mask-clip-path` element to 100% of the viewport height.
      borderRadius: 0,  // Resets any border radius to create a square or rectangular shape.
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">  {/* The container for the "About" section */}
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">  {/* Section with a heading, animated title, and subtext */}
          <h2 className="font-general text-sm uppercase md:text-[10px]">
            Welcome to Zentry
          </h2>

          {/* Custom AnimatedTitle component that shows an animated heading */}
          <AnimatedTitle title="Disc<b>o</b>ver the world&apos;s <br /> l<b>a</b>rgest shared adventure" containerClass="mt-5 !text-black text-center" />
          
          {/* Text describing the game */}
          <div className="about-subtext">
            <p>The Game of Games begins-your life, now an epic MMORPG</p>
            <p className="text-gray-500">Zentry unites every player from countless games and platforms</p>
          </div>
        </div>

        {/* The element with id "clip", used as the trigger for ScrollTrigger */}
        <div className="h-dvh w-screen" id="clip">
          <div className="mask-clip-path about-image">
            {/* Background image that will be clipped by a mask */}
            <img 
             src="img/about.webp"  // Image source
             alt="background"  // Alt text for the image
             className="absolute left-0 top-0 size-full object-cover"  // Styling the image to cover the full container and position it correctly
            />
          </div>
        </div>
    </div>
  );
};

export default About;  // Exporting the About component for use in other parts of the app.
