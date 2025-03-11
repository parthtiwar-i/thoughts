import { BookOpen } from "lucide-react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const HIDDEN_FOOTER_PATHS = ["/login", "/signup", "/publish"];

  const location = useLocation();
  if (HIDDEN_FOOTER_PATHS.includes(location.pathname)) {
    return null;
  }
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-vintage-brown/10 dark:border-darkVintage-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <BookOpen className="h-8 w-8 text-vintage-brown dark:text-darkVintage-gold" />
            {/* <img
              src=""
              alt="Vintage Tales Logo"
              className="h-8 w-8 text-vintage-brown dark:text-darkVintage-gold opacity-80 dark:invert"
            /> */}
            <span className="text-xl font-playfair font-semibold text-vintage-ink dark:text-darkVintage-ink">
              Thoughts
            </span>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 text-sm font-cormorant text-vintage-ink/80 dark:text-darkVintage-ink/80">
            <a
              href="/"
              className="hover:text-vintage-accent dark:hover:text-darkVintage-accent transition-colors py-1"
            >
              Home
            </a>
            <a
              href="/blogs"
              className="hover:text-vintage-accent dark:hover:text-darkVintage-accent transition-colors py-1"
            >
              Blog
            </a>
            <a
              href="#"
              className="hover:text-vintage-accent dark:hover:text-darkVintage-accent transition-colors py-1"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-vintage-accent dark:hover:text-darkVintage-accent transition-colors py-1"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:text-vintage-accent dark:hover:text-darkVintage-accent transition-colors py-1"
            >
              Privacy
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-vintage-brown/10 dark:border-darkVintage-gold/10 text-center">
          <p className="text-sm text-vintage-ink/60 dark:text-darkVintage-ink/60 font-cormorant">
            © {new Date().getFullYear()} Thoughts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    // <footer className="bg-orange-200 shadow">
    //   <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    //     <div className="sm:flex sm:items-center sm:justify-between">
    //       <a
    //         href="/"
    //         className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
    //       >
    //         <img src="/logoBook.png" className="h-8" alt="thoughts Logo" />
    //         <span className="self-center text-2xl text-orange-950 font-semibold whitespace-nowrap">
    //           Thoughts
    //         </span>
    //       </a>
    //       <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
    //         <li>
    //           <a href="#" className="hover:underline me-4 md:me-6">
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:underline me-4 md:me-6">
    //             Privacy Policy
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:underline me-4 md:me-6">
    //             Bloging
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:underline">
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <hr className="my-6 border-orange-950 sm:mx-auto  lg:my-8" />
    //     <span className="block text-sm text-gray-500 sm:text-center ">
    //       © 2024{" "}
    //       <a href="/" className="hover:underline">
    //         Thoughts™
    //       </a>
    //       . All Rights Reserved.
    //     </span>
    //   </div>
    // </footer>
  );
};
