// Importing social media icons from react-icons package
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// Defining an array to store social media links and associated icons
const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

// Footer component that renders the footer section with social media links and privacy policy
const Footer = () => {
  return (
    // Footer section with a purple background and black text
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        
        {/* Copyright text with small font size */}
        <p className="text-center text-sm font-light md:text-left">
          ©Nova 2024. All rights reserved
        </p>

        {/* Social media icons, centered on mobile and left-aligned on desktop */}
        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href} // Linking to the social media platform
              target="_blank" // Open the link in a new tab
              rel="noopener noreferrer" // Prevent security risks when opening the link
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon} {/* Render the appropriate social media icon */}
            </a>
          ))}
        </div>

        {/* Privacy Policy link with hover effect */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
