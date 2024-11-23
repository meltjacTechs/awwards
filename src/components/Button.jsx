// Importing clsx for conditional className management
import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    // Button element with dynamic class names applied
    <button
      id={id} // Button ID passed as a prop
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black", // Default button styles
        containerClass // Additional custom container class passed as a prop
      )}
    >
      {/* Render left icon, if provided */}
      {leftIcon}

      {/* Text container for the button label */}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {/* Title with hover animation for skew and vertical translation */}
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title} {/* Display button title */}
        </div>
        {/* Duplicate title with reversed animation for hover effect */}
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title} {/* Display button title again with a different transform effect */}
        </div>
      </span>

      {/* Render right icon, if provided */}
      {rightIcon}
    </button>
  );
};

export default Button;
