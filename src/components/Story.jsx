import gsap from "gsap";  // Importing GSAP for animation effects
import { useRef } from "react";  // Importing useRef hook to reference DOM elements

import Button from "./Button";  // Importing a custom Button component
import AnimatedTitle from "./AnimatedTitle";  // Importing a custom AnimatedTitle component

const FloatingImage = () => {
  const frameRef = useRef(null); // Using useRef to create a reference for the image element

  // Handle mouse movement over the image
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;  // Getting mouse position
    const element = frameRef.current; // Accessing the DOM element using the reference

    if (!element) return;  // If the element is not found, exit early

    const rect = element.getBoundingClientRect();  // Getting the position and size of the image
    const xPos = clientX - rect.left;  // X position relative to the image's left edge
    const yPos = clientY - rect.top;  // Y position relative to the image's top edge

    const centerX = rect.width / 2;  // Calculating the center X of the image
    const centerY = rect.height / 2;  // Calculating the center Y of the image

    // Calculate the rotation values for the tilt effect based on mouse position
    const rotateX = ((yPos - centerY) / centerY) * -10; // Negative value for reverse tilt
    const rotateY = ((xPos - centerX) / centerX) * 10; // Positive value for right tilt

    // Using GSAP to animate the image's rotation when the mouse moves
    gsap.to(element, {
      duration: 0.3,  // Duration of the animation
      rotateX,  // Rotation on the X-axis (tilt up/down)
      rotateY,  // Rotation on the Y-axis (tilt left/right)
      transformPerspective: 500,  // Perspective to make the 3D effect more pronounced
      ease: "power1.inOut",  // Ease for smooth transition
    });
  };

  // Handle mouse leaving the image, resetting the tilt effect
  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,  // Resetting the tilt effect in 0.3 seconds
        rotateX: 0,  // Resetting X-axis rotation
        rotateY: 0,  // Resetting Y-axis rotation
        ease: "power1.inOut",  // Ease for smooth transition
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      {/* Main container with black background and text color */}
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          {/* Animated title with custom styles */}
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}  // Attaching the image reference
                  onMouseMove={handleMouseMove}  // Listening for mouse move to trigger tilt effect
                  onMouseLeave={handleMouseLeave}  // Reset tilt when the mouse leaves the image
                  onMouseUp={handleMouseLeave}  // Reset tilt when mouse is released
                  onMouseEnter={handleMouseLeave}  // Reset tilt when the mouse enters
                  src="/img/entrance.webp"  // Path to the image file
                  alt="entrance.webp"  // Alt text for the image
                  className="object-contain"  // Ensuring the image fits inside its container while maintaining aspect ratio
                />
              </div>
            </div>

            {/* Hidden SVG for additional visual effects (rounded corners or filters) */}
            <svg
              className="invisible absolute size-0"  // Invisible SVG, hidden by default
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  {/* Apply a Gaussian blur to the source graphic */}
                  <feGaussianBlur
                    in="SourceGraphic"  // Applying the blur to the original graphic
                    stdDeviation="8"  // Intensity of the blur
                    result="blur"  // Naming the result of the blur operation
                  />
                  {/* Applying color transformation using a matrix filter */}
                  <feColorMatrix
                    in="blur"  // Using the blurred graphic as input
                    mode="matrix"  // Color mode transformation
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"  // Transformation values
                    result="flt_tag"  // Naming the result of the color matrix operation
                  />
                  {/* Composite the original graphic with the transformed (blurred and color matrix applied) graphic */}
                  <feComposite
                    in="SourceGraphic"  // The original image
                    in2="flt_tag"  // The filtered result
                    operator="atop"  // "Atop" operator keeps the top graphic visible
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Section for the description and button */}
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            {/* Custom Button component */}
            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
