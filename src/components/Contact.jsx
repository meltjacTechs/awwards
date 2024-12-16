// Importing necessary components for the page.
import AnimatedTitle from "./AnimatedTitle"; // Custom component for animated titles.
import Button from "./Button"; // Custom button component.

const ImageClipBox = ({ src, clipClass }) => (
  // A simple reusable component to render an image with a clip class.
  <div className={clipClass}>
    <img src={src} alt="contact" /> {/* The image source is passed as 'src' prop */}
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      {/* Main container for the Contact section */}
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Container for the background images with rounded corners and padding */}
        
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          {/* A section that holds the contact images, positioned absolutely for layout control */}
          
          {/* The first image is clipped with the 'contact-clip-path-1' */}
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          
          {/* The second image is clipped with the 'contact-clip-path-2' and also translated */}
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* This section holds additional images, possibly a character image */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          {/* The swordman image is clipped and scaled on medium to larger screens */}
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          
          {/* Full swordman image with a specific clip path applied */}
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* This section handles the text and button layout */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase z-50">
            {/* The text above the title */}
            Join Zentry
          </p>

          {/* Animated title component displaying the main heading */}
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          {/* The contact us button */}
          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact; 
