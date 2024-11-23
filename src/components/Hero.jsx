// Import necessary dependencies and components
import gsap from "gsap"; // GSAP animation library
import { useGSAP } from "@gsap/react"; // React hook for integrating GSAP
import { ScrollTrigger } from "gsap/all"; // ScrollTrigger plugin for scroll-based animations
import { TiLocationArrow } from "react-icons/ti"; // Icon for the button
import { useEffect, useRef, useState } from "react"; // React hooks

import Button from "./Button"; // Custom Button component
import VideoPreview from "./VideoPreview"; // Custom VideoPreview component

// Register the ScrollTrigger plugin for use in animations
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // State variables for controlling video index, load status, and click handling
  const [currentIndex, setCurrentIndex] = useState(1); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Flags whether the mini video has been clicked

  // Loading state to manage video loading progress
  const [loading, setLoading] = useState(true); // Controls loading state for videos
  const [loadedVideos, setLoadedVideos] = useState(0); // Keeps track of how many videos have loaded

  const totalVideos = 4; // Total number of videos to be displayed
  const nextVdRef = useRef(null); // Reference for the next video element

  // Handles when a video is loaded, incrementing the loaded video counter
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Effect hook that sets loading to false once all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false); // Set loading to false once all videos are loaded
    }
  }, [loadedVideos]);

  // Handles when the mini-video is clicked to update the video index
  const handleMiniVdClick = () => {
    setHasClicked(true); // Set hasClicked to true when mini-video is clicked

    // Cycle through the video index
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // GSAP animation when a mini video is clicked to transition to the full video
  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" }); // Make the next video visible
      gsap.to("#next-video", {
        transformOrigin: "center center", // Set the animation origin
        scale: 1, // Scale the next video to full size
        width: "100%", // Ensure the video fills the container
        height: "100%",
        duration: 1, // Duration of the animation
        ease: "power1.inOut", // Easing function for smooth transition
        onStart: () => nextVdRef.current.play(), // Play the next video when the animation starts
      });
      // Animate the current video to shrink out
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, {
    dependencies: [currentIndex], // Re-run animation when currentIndex changes
    revertOnUpdate: true, // Revert the animations when dependencies change
  });

  // GSAP animation for the video frame's shape and border radius on scroll
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)", // Initial clip-path for the frame
      borderRadius: "0% 0% 40% 10%", // Initial border radius for the frame
    });
    // Animation on scroll that animates clip-path and border-radius of the video frame
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Animated clip-path to reveal the frame shape
      borderRadius: "0% 0% 0% 0%", // Border radius animation
      ease: "power1.inOut", // Easing function
      scrollTrigger: {
        trigger: "#video-frame", // Element to trigger the animation on scroll
        start: "center center", // Start the animation when the element reaches the center
        end: "bottom center", // End the animation when the bottom reaches the center
        scrub: true, // Smooth scrolling effect with the animation
      },
    });
  });

  // Helper function to get video source URL based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading animation, displayed until all videos are loaded */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* Loading animation (three dots spinning effect) */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video frame container */}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          {/* Video preview with a clickable mini-video */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick} // Handle mini-video click
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                {/* Mini video preview */}
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)} // Get next video based on index
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad} // Track video loading progress
                />
              </div>
            </VideoPreview>
          </div>

          {/* The main full-screen video */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)} // Get the current video source
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad} // Track video loading progress
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} // Loop back to the first video
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad} // Track video loading progress
          />
        </div>

        {/* Main heading (GAMING) */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

        {/* Overlay content with call-to-action */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            {/* Short description */}
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            {/* Button to watch trailer */}
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Duplicate of the GAMING heading */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
