// Importing necessary dependencies
import gsap from "gsap"; // For animations
import { useEffect, useRef, useState } from "react"; // React hooks for state, refs, and lifecycle management
import Button from "./Button"; // Custom button component
import { TiLocationArrow } from "react-icons/ti"; // Icon for the 'Products' button
import { useWindowScroll } from "react-use"; // Hook to track scroll position

// Defining the navigation items for the navbar
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  // Local state to track scroll position and navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Previous scroll position
  const [isNavVisible, setIsNavVisible] = useState(true); // State to show/hide navbar based on scroll
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // State for audio play/pause
  const [isIndicatorActive, setIsIndicatorActive] = useState(false); // State for the indicator animation
  
  // Refs for DOM elements
  const navContainerRef = useRef(null); // Ref for the navbar container
  const audioElementRef = useRef(null); // Ref for the audio element

  // Using 'useWindowScroll' hook to track the current scroll position
  const { y: currentScrollY } = useWindowScroll();

  // Effect to handle navbar visibility and floating effect based on scroll position
  useEffect(() => {
    // When the user scrolls to the top, reset visibility to true and remove 'floating-nav' class
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } 
    // When scrolling down, hide the navbar and add 'floating-nav' class
    else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } 
    // When scrolling up, show the navbar and add 'floating-nav' class
    else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]); // Depend on scroll position changes

  // Use GSAP animation to smoothly transition navbar visibility and opacity based on scroll behavior
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100, // Move navbar up or down
      opacity: isNavVisible ? 1 : 0, // Fade navbar in/out
      duration: 0.2, // Set duration of the animation
    });
  }, [isNavVisible]); // Trigger the animation whenever navbar visibility changes

  // Function to toggle audio play/pause and activate the indicator animation
  const toggleAudioIndicator = () => {
    // Toggle audio state
    setIsAudioPlaying((prev) => !prev);

    // Toggle indicator state to animate the audio bars
    setIsIndicatorActive((prev) => !prev);
  };

  // Effect to play or pause the audio based on the audio state
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play(); // Play audio if the state is true
    } else {
      audioElementRef.current.pause(); // Pause audio if the state is false
    }
  }, [isAudioPlaying]); // Trigger audio play/pause whenever the state changes

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      {/* Navbar header */}
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            {/* Logo */}
            <img 
              src="/img/logo.png"
              alt="logo"
              className="w-10"
            />
            {/* Products button */}
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />} // Right arrow icon
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation links */}
          <div className="flex h-full items-center">
            {/* Display nav items only on larger screens */}
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>

            {/* Audio toggle button with indicator animation */}
            <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
              {/* Hidden audio element */}
              <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
             
              {/* Render indicator bars with animation delay */}
              {[1, 2, 3, 4].map((bar) => (
                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}} />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
