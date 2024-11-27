import { useState, useRef } from "react"; // Importing necessary React hooks for state and refs
import { TiLocationArrow } from "react-icons/ti"; // Importing location arrow icon from react-icons

// BentoTilt component adds a tilt effect to any children elements on mouse move
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState(""); // State to store the transform style for tilt effect
  const itemRef = useRef(null); // Reference to the element for tilt effect calculation

  // Handle mouse move over the component to calculate the relative position and apply tilt effect
  const handleMouseMove = (event) => {
    if (!itemRef.current) return; // Ensure itemRef is set

    const { left, top, width, height } = itemRef.current.getBoundingClientRect(); // Get the component's position and size

    // Calculate relative mouse position as a percentage of width and height
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    // Compute tilt angles based on relative mouse position
    const tiltX = (relativeY - 0.5) * 5; // Tilt in X direction (vertical)
    const tiltY = (relativeX - 0.5) * -5; // Tilt in Y direction (horizontal)

    // Apply the perspective and tilt transformation
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform); // Update the transform style to apply the tilt effect
  };

  // Reset transform when mouse leaves the element
  const handleMouseLeave = () => {
    setTransformStyle(""); // Clear tilt effect
  };

  return (
    <div
      ref={itemRef} // Attach the ref to the element for tracking position
      className={className} // Additional className passed as prop
      onMouseMove={handleMouseMove} // Attach mouse move event handler
      onMouseLeave={handleMouseLeave} // Attach mouse leave event handler
      style={{ transform: transformStyle }} // Apply the computed transform style to the element
    >
      {children} {/* Render the children components inside the tilted container */}
    </div>
  );
};

// BentoCard component represents individual cards with video background and hover effects
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // State for cursor position within button area
  const [hoverOpacity, setHoverOpacity] = useState(0); // State for hover opacity effect
  const hoverButtonRef = useRef(null); // Ref for the hover button to track position

  // Handle mouse move to track cursor position within the hover button
  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return; // Ensure hoverButtonRef is set
    const rect = hoverButtonRef.current.getBoundingClientRect(); // Get position and size of the hover button

    // Calculate cursor position relative to button area
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  // Show hover effect on mouse enter
  const handleMouseEnter = () => setHoverOpacity(1);

  // Hide hover effect on mouse leave
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {/* Video background for BentoCard */}
      <video
        src={src} // Source of the video for the background
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center" // Ensure video covers the whole container
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        {/* Title and description of the BentoCard */}
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {/* Conditional rendering of "coming soon" button */}
        {isComingSoon && (
          <div
            ref={hoverButtonRef} // Attach ref to track mouse movements
            onMouseMove={handleMouseMove} // Attach mouse move handler
            onMouseEnter={handleMouseEnter} // Show hover effect on mouse enter
            onMouseLeave={handleMouseLeave} // Hide hover effect on mouse leave
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect on button */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity, // Control opacity based on hover state
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`, // Dynamic radial gradient
              }}
            />
            {/* Coming soon icon and text */}
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Features section containing a set of BentoCards with tilt effect
const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      {/* Section intro text */}
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into the Metagame Layer
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      {/* BentoTilt container that wraps BentoCard with tilt effect */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4" // Video source for the feature card
          title={
            <>
              radia<b>n</b>t
            </>
          }
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon // Indicating that the feature is coming soon
        />
      </BentoTilt>

      {/* Grid layout for additional BentoCards */}
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        {/* More BentoCards inside BentoTilt wrappers */}
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>

        {/* Card with coming soon text and an icon */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        {/* Video with no description (just a visual feature card) */}
        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features; 