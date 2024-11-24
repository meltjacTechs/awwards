// Importing necessary dependencies
import { gsap } from "gsap";  // GSAP is a JavaScript animation library used for creating animations.
import { useEffect, useRef } from "react";  // React hooks for managing side effects and references to DOM elements.
import { ScrollTrigger } from "gsap/ScrollTrigger";  // GSAP plugin that helps trigger animations when scrolling.
import clsx from "clsx";  // Utility for conditionally joining class names.

gsap.registerPlugin(ScrollTrigger);  // Registering the ScrollTrigger plugin with GSAP.

const AnimatedTitle = ({title, containerClass}) => {  // A functional component that takes `title` and `containerClass` as props.
    const containerRef = useRef(null);  // Creating a reference to the container DOM element, so we can interact with it directly.

    useEffect(() => {
        // useEffect hook runs the code inside only after the component mounts (ensures animation is applied after render).
        const ctx = gsap.context(() => {
            // Creating a GSAP timeline that controls the animation sequence.
            const titleAnimation = gsap.timeline({
                scrollTrigger: {  // ScrollTrigger settings
                    trigger: containerRef.current,  // Element to trigger the animation (refers to the container element).
                    start: "100 bottom",  // Animation starts when the bottom of the container reaches the top of the viewport.
                    end: "center bottom",  // Animation ends when the center of the container reaches the bottom of the viewport.
                    toggleActions: 'play none none reverse'  // Defines actions when the scroll position meets the start and end points.
                    // 'play' means the animation will play when the trigger is in the start position, and 'reverse' will reverse the animation when scrolling back.
                }
            });

            // The animation itself: targeting `.animated-word` elements
            titleAnimation.to(
                ".animated-word",  // Target all elements with the class `.animated-word`.
                {
                    opacity: 1,  // Make the element fully opaque (visible).
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",  // Reset transform properties (reset any rotations or translations).
                    ease: 'power2.inOut',  // A smooth easing function for the animation.
                    stagger: 0.02,  // Stagger the start of each word's animation by 0.02 seconds for a more fluid effect.
                },
                0  // Start the animation immediately when the ScrollTrigger is activated.
            );
        }, containerRef);

        return () => ctx.revert();  // Cleanup function: ensures the GSAP context is removed when the component unmounts.
    }, []);  // Empty dependency array ensures this effect runs only once after the initial render.

  return (
    // JSX that returns the animated title component.
    <div
      ref={containerRef}  // Attach the containerRef to the container element.
      className={clsx("animated-title", containerClass)}  // Apply dynamic class names using clsx (e.g., combining "animated-title" and any custom class passed via props).
    >
        {title.split("<br />").map((line, index) => (
            // Split the title into multiple lines wherever a `<br />` tag is found and map over each line.
            <div 
            key={index}  // Key for the list rendering.
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"  // Styling classes to center content and manage layout.
            >
                {line.split(" ").map((word, idx) => (
                    // Split each line into words (space-separated) and map over each word.
                    <span 
                      key={idx}  // Key for each word span element.
                      className="animated-word"  // Assign the class `animated-word` to each word.
                      dangerouslySetInnerHTML={{__html: word}}  // Use `dangerouslySetInnerHTML` to render the word as HTML (allowing HTML tags within the word if needed).
                    />
                ))}
            </div>
        ))}
    </div>
  );
}

export default AnimatedTitle;  // Export the component to be used elsewhere in the app.
