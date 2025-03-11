import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen, Sun, Moon } from "lucide-react";
import { useTheme } from "./themeProvider";
import { useAuth } from "../context";
import Avatar from "./ui/userAvatar";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-10 py-4 
        ${
          isScrolled
            ? "bg-vintage-paper bg-opacity-90 shadow-md backdrop-blur-sm dark:bg-darkVintage-paper dark:bg-opacity-90"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-vintage-brown dark:text-darkVintage-gold" />
          <span className="text-xl md:text-2xl font-playfair font-semibold text-vintage-ink dark:text-darkVintage-ink">
            Thoughts
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="font-cormorant text-lg text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent border-b-2 border-transparent hover:border-vintage-accent dark:hover:border-darkVintage-accent transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="font-cormorant text-lg text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent border-b-2 border-transparent hover:border-vintage-accent dark:hover:border-darkVintage-accent transition-all duration-300"
          >
            Blogs
          </Link>
          <Link
            to="/publish"
            className="font-cormorant text-lg text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent border-b-2 border-transparent hover:border-vintage-accent dark:hover:border-darkVintage-accent transition-all duration-300"
          >
            Publish
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="font-cormorant text-lg text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent border-b-2 border-transparent hover:border-vintage-accent dark:hover:border-darkVintage-accent transition-all duration-300"
            >
              <Avatar name={user.name} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="font-cormorant text-lg text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent border-b-2 border-transparent hover:border-vintage-accent dark:hover:border-darkVintage-accent transition-all duration-300"
            >
              Login
            </Link>
          )}
          {/* <Link
            to="/contact"
            className="font-cormorant text-lg text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent border-b-2 border-transparent hover:border-vintage-accent dark:hover:border-darkVintage-accent transition-all duration-300"
          >
            Contact
          </Link> */}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-vintage-cream dark:bg-darkVintage-brown hover:bg-vintage-gold/20 dark:hover:bg-darkVintage-gold/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-vintage-ink" />
            ) : (
              <Sun className="h-5 w-5 text-darkVintage-ink" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-vintage-cream dark:bg-darkVintage-brown hover:bg-vintage-gold/20 dark:hover:bg-darkVintage-gold/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-vintage-ink" />
            ) : (
              <Sun className="h-5 w-5 text-darkVintage-ink" />
            )}
          </button>

          <button
            className="text-vintage-ink dark:text-darkVintage-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-vintage-paper bg-opacity-95 backdrop-blur-sm shadow-md border-t border-vintage-accent/20 dark:bg-darkVintage-paper dark:bg-opacity-95 dark:border-darkVintage-accent/20 animate-fade-in">
          <div className="flex flex-col space-y-4 p-6">
            <Link
              to="/"
              className="font-cormorant text-xl text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="font-cormorant text-xl text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="font-cormorant text-xl text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-cormorant text-xl text-vintage-ink dark:text-darkVintage-ink hover:text-vintage-accent dark:hover:text-darkVintage-accent py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
