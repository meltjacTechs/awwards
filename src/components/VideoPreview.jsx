// Import necessary dependencies
import { gsap } from "gsap"; // GSAP animation library for smooth animations
import { useState, useRef, useEffect } from "react"; // React hooks

export const VideoPreview = ({ children }) => {
  // State to track whether the user is hovering over the element
  const [isHovering, setIsHovering] = useState(false);

  // References to the section and inner content for manipulation
  const sectionRef = useRef(null); // Reference for the container section
  const contentRef = useRef(null); // Reference for the inner content (children)

  // Function to handle mouse movement over the section
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    // Get the bounding rectangle of the section to determine its position
    const rect = currentTarget.getBoundingClientRect();

    // Calculate the offset of the mouse pointer from the center of the container
    const xOffset = clientX - (rect.left + rect.width / 2); // Horizontal offset
    const yOffset = clientY - (rect.top + rect.height / 2); // Vertical offset

    // Only trigger animation when hovering
    if (isHovering) {
      // Animate the section (container) to slightly move in the direction of the cursor
      gsap.to(sectionRef.current, {
        x: xOffset, // Apply horizontal translation based on mouse position
        y: yOffset, // Apply vertical translation based on mouse position
        rotationY: xOffset / 2, // Add 3D horizontal rotation effect based on X offset
        rotationX: -yOffset / 2, // Add 3D vertical rotation effect based on Y offset
        transformPerspective: 500, // Define the perspective depth for a realistic 3D effect
        duration: 1, // Duration of the animation
        ease: "power1.out", // Easing function for smooth movement
      });

      // Apply a parallax effect to the content (opposite direction of the section movement)
      gsap.to(contentRef.current, {
        x: -xOffset, // Move content in the opposite X direction
        y: -yOffset, // Move content in the opposite Y direction
        duration: 1, // Duration of the animation
        ease: "power1.out", // Easing function for smooth movement
      });
    }
  };

  // Effect hook that resets the position of the section and content when hover ends
  useEffect(() => {
    if (!isHovering) {
      // Reset section (container) position and 3D rotations
      gsap.to(sectionRef.current, {
        x: 0, // Reset horizontal position
        y: 0, // Reset vertical position
        rotationY: 0, // Reset horizontal rotation
        rotationX: 0, // Reset vertical rotation
        duration: 1, // Duration of the reset animation
        ease: "power1.out", // Easing function for smooth transition
      });

      // Reset content (children) position
      gsap.to(contentRef.current, {
        x: 0, // Reset horizontal position of content
        y: 0, // Reset vertical position of content
        duration: 1, // Duration of the reset animation
        ease: "power1.out", // Easing function for smooth transition
      });
    }
  }, [isHovering]); // Only runs when isHovering state changes

  return (
    // The section element that holds the content, with mouse event listeners
    <section
      ref={sectionRef} // Reference to the section container
      onMouseMove={handleMouseMove} // Track mouse movement over the section
      onMouseEnter={() => setIsHovering(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovering(false)} // Set hover state to false on mouse leave
      className="absolute z-50 size-full overflow-hidden rounded-lg" // Tailwind classes for layout and styling
      style={{
        perspective: "500px", // Apply 3D perspective effect
      }}
    >
      {/* Inner content of the section, which will move opposite to the container for a parallax effect */}
      <div
        ref={contentRef} // Reference to the inner content
        className="origin-center rounded-lg" // Tailwind classes for layout and styling
        style={{
          transformStyle: "preserve-3d", // Enable 3D transformations for the content
        }}
      >
        {/* Render the children passed to the component */}
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
