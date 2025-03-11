import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface AnimatedButtonProps {
  text: string;
  href: string;
  className?: string;
}

export const AnimatedButton = ({ text, href, className }: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={href}
      className={cn(
        "inline-flex items-center space-x-2 px-6 py-3 font-cormorant text-lg md:text-xl text-vintage-ink dark:text-darkVintage-ink bg-vintage-cream dark:bg-darkVintage-paper/30 border-2 border-vintage-brown/20 dark:border-darkVintage-gold/30 rounded-md shadow-sm transition-all duration-300 overflow-hidden relative group",
        "hover:shadow-md hover:border-vintage-accent/30 dark:hover:border-darkVintage-accent/30 hover:text-vintage-accent dark:hover:text-darkVintage-accent",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{text}</span>
      <ArrowRight
        size={20}
        className={cn(
          "transition-transform duration-300",
          isHovered ? "translate-x-1" : ""
        )}
      />
      <span className="absolute inset-0 w-0 bg-vintage-gold/5 dark:bg-darkVintage-gold/10 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

