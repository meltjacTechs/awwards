import { useRef, useState } from "react";

const Hero = () => {
    // State to track the current video index
    const [currentIndex, setCurrentIndex] = useState(1);
    // State to track whether the mini-video has been clicked
    const [hasClicked, setHasClicked] = useState(false);
    // State to track if the video or other elements are still loading
    const [isLoading, setIsLoading] = useState(true);
    // State to count the number of videos that have fully loaded
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3; // Total number of videos available in the cycle
    const nextVideoRef = useRef(null);// Reference to the next video element for manipulation

     // Function to increment the count of loaded videos when a video finishes loading
    const handleVideoLoad = () => {
      setLoadedVideos((prev) => prev + 1);
    }
     // Modulo operator to determine the next video index in a circular manner
    // This ensures that the video index loops back to 1 after reaching the last video
    //modulo operator functionality in brief
    //0 % 4 = 0 + 1 = 1
    //1 % 4 = 1 + 1 = 2
    //2 % 4 = 2 + 1 = 3
    //3 % 4 = 3 + 1 = 4
    //4 % 4 = 0 + 1 = 1
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    //handle  the mini video that pops up on hover and its state when clicked to cover the whole screen
    const handleMiniVideoClick =() =>{
      setHasClicked(true);// Marks that the video has been clicked

      // setCurrentIndex((prevIndex) => prevIndex + 1); Moves to the next video but tat the end one runs out of videos
      setCurrentIndex(upcomingVideoIndex); // Updates the current video index and ensure ther will always be a video to play
    }
    // Dynamically generates the video source path based on the index
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;


  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
         {/* Container for the video frame */}
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75s">
            <div>
              {/* Mask-clip path that contains the hoverable video element */}
               <div className="mask-clip-path absolute-center absolute z-50 size-64
               cursor-pointer overflow-hidden rounded-lg">
                <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                  {/* Next video preview */}
                    <video
                     ref={nextVideoRef}// References the next video elemen
                    //  src={getVideoSrc(currentIndex + 1)} Gets the source of the next video in the sequence
                    src={getVideoSrc(upcomingVideoIndex)} //Get the source through the modulo operator and ensure clip video is always different from the main video
                     loop// Ensures the video plays continuously
                     muted// Mutes the video
                     id="current-video"// Assigns an ID for potential manipulation
                     className="size-64 origin-center scale-150 object-cover object-center"
                     onLoadedData={handleVideoLoad}// Triggers when the video data is fully loaded
                    />
                </div>
               </div>
               <video
                ref={nextVideoRef}// References the next video element
                src={getVideoSrc(currentIndex)}// Gets the source of the current video based on index
               /> 
            </div>
        </div>
    </div>
  )
}

export default Hero