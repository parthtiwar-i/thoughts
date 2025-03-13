// import { useCallback, useMemo } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { ParallexImage } from "../components/parallexImage";
// import { homeHeroTitle, parallexImages } from "../config";
// import { InfoSection } from "../components/infoSection";
// import { useNavigate } from "react-router-dom";
// import ImageQuoteCard from "../components/imageQuoteSection";

// const Home = () => {
//   const navigate = useNavigate();
//   const { scrollYProgress } = useScroll();

//   // Transform values without useMemo
//   const backgroundSize = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ["100%", "200%"]
//   );
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

//   // Memoize navigation handler
//   const handleNavigate = useCallback(() => {
//     navigate("/blogs");
//   }, [navigate]);

//   // Memoized hero text animation variants
//   const textAnimation = {
//     initial: { opacity: 0, y: 20, scale: 0.9 },
//     animate: { opacity: 1, y: 0, scale: 1 },
//   };

//   // Memoized animated title
//   const animatedTitle = useMemo(
//     () =>
//       homeHeroTitle.split(" ").map((el, i) => (
//         <motion.span
//           key={i}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{
//             duration: 2,
//             delay: i * 0.2, // Adjust delay to be more natural
//           }}
//         >
//           {el}{" "}
//         </motion.span>
//       )),
//     []
//   );

//   // Memoized parallex images
//   const parallexImagesComponents = useMemo(
//     () =>
//       parallexImages.map((image, i) => (
//         <ParallexImage
//           key={i}
//           src={image.src}
//           className={image.className}
//           start={image.start}
//           end={image.end}
//         />
//       )),
//     []
//   );

//   return (
//     <div>
//       <div className="h-[200vh] relative">
//         <motion.div
//           style={{
//             backgroundSize,
//             opacity,
//             backgroundImage: `url(/openedBook.webp)`,
//           }}
//           className="hero h-screen sticky top-0 flex justify-center items-center bg-cover bg-center bg-no-repeat"
//         >
//           <div className="p-40 pl-96">
//             <motion.h1
//               variants={textAnimation}
//               initial="initial"
//               animate="animate"
//               transition={{
//                 delay: 1,
//                 duration: 0.5,
//               }}
//               className="text-9xl text-orange-950 font-heroFont"
//             >
//               Thoughts
//             </motion.h1>
//             <p className="text-orange-800 text-xl font-mono">{animatedTitle}</p>
//           </div>
//           <div className="animation absolute right-1/4 bottom-32">
//             <motion.div
//               style={{
//                 backgroundImage: `url(/pen.webp)`,
//               }}
//               animate={{ y: [0, 7, 0] }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "loop",
//               }}
//               className="absolute w-36 h-36 bg-cover right-1/4 bottom-8"
//             />
//           </div>
//         </motion.div>

//         {parallexImagesComponents}
//       </div>

//       <InfoSection />
//       <ImageQuoteCard
//         imageSrc="./letterRoll.png"
//         leftQuote="This is left Quote"
//         rightQuote="This is right quote"
//       />

//       <div className="bg-orange-50 text-center flex justify-center items-center">
//         <button
//           onClick={handleNavigate}
//           className="text-lg font-semibold font-mono hover:cursor-pointer bg-orange-200 hover:bg-orange-300 p-3 rounded-xl shadow-sm border border-red-400"
//         >
//           Move to Blogs
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useRef, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { parallexImages } from "../config";
import { ParallexImage } from "../components/ui/parallexImage";
import { AnimatedButton } from "../components/animatedButton";

const Home = () => {
  const previewsSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const parallexImagesComponents = useMemo(
    () =>
      parallexImages.map((image, i) => (
        <ParallexImage
          key={i}
          src={image.src}
          className={image.className}
          start={image.start}
          end={image.end}
        />
      )),
    []
  );

  return (
    <div className="min-h-screen bg-vintage-paper dark:bg-darkVintage-paper overflow-x-hidden">
      {/* Main Content */}
      <>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-vintage-accent bg-opacity-10 text-vintage-accent dark:bg-darkVintage-accent dark:bg-opacity-10 dark:text-darkVintage-accent text-sm font-medium mb-6 animate-fade-in">
              A Collection of Knowledge
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-vintage-ink dark:text-darkVintage-ink animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Thoughts
            </h1>
            <p
              className="mt-6 text-xl md:text-2xl font-cormorant text-vintage-ink/80 dark:text-darkVintage-ink/80 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Where every page turn reveals a story from a bygone era, preserved
              in the amber of time.
            </p>
            <div
              className="mt-10 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <button
                onClick={() => scrollToSection(previewsSectionRef)}
                className="inline-flex items-center space-x-2 px-7 py-3 rounded-md bg-vintage-brown dark:bg-darkVintage-gold text-white dark:text-darkVintage-parchment hover:bg-vintage-darkBrown dark:hover:bg-darkVintage-accent transition-colors shadow-md"
              >
                <span className="font-cormorant text-lg">Discover...</span>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-soft cursor-pointer"
            onClick={() => scrollToSection(previewsSectionRef)}
          >
            <ArrowDown className="h-8 w-8 text-vintage-accent dark:text-darkVintage-accent" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-24 h-24 opacity-10 animate-float hidden md:block">
            <img src="/pen.webp" alt="Decorative" className="dark:invert" />
          </div>
          <div
            className="absolute bottom-20 right-10 w-32 h-32 opacity-10 animate-float hidden md:block"
            style={{ animationDelay: "1s" }}
          >
            <img src="/pen.webp" alt="Decorative" className="dark:invert" />
          </div>
        </section>

        {/* Parallax Section */}
        {parallexImagesComponents}

        {/* Blog Previews Section with Zoom Effect */}
        <section
          ref={previewsSectionRef}
          className="py-20 px-4 sm:px-6"
          id="previews-section"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-vintage-gold bg-opacity-10 text-vintage-gold dark:bg-darkVintage-gold dark:bg-opacity-10 dark:text-darkVintage-gold text-sm font-medium mb-3">
                Featured Posts
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-vintage-ink dark:text-darkVintage-ink">
                Latest Chronicles
              </h2>
              <div className="w-20 h-1 bg-vintage-accent/40 dark:bg-darkVintage-accent/40 mx-auto mt-4"></div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <BlogPreview
                  title="The Lost Art of Letter Writing"
                  description="In a digital age, the handwritten letter stands as a testament to thoughtfulness and personal touch."
                  image="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  link="/blog"
                />
                <BlogPreview
                  title="Forgotten Bookshops of Europe"
                  description="Hidden among cobblestone streets, these treasured bookshops hold centuries of literary history."
                  image="https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  link="/blog"
                />
              </div> */}
          </div>
        </section>

        {/* CTA Section with animated button */}
        <section
          ref={ctaSectionRef}
          className="py-24 px-4 sm:px-6 bg-vintage-cream bg-opacity-50 dark:bg-darkVintage-brown dark:bg-opacity-20"
          id="cta-section"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-vintage-ink dark:text-darkVintage-ink mb-6">
                Continue Your Literary Journey
              </h2>
              <p className="text-xl font-cormorant text-vintage-ink/80 dark:text-darkVintage-ink/80 max-w-2xl mx-auto">
                Explore our curated collection of vintage stories, literary
                analyses, and historical perspectives.
              </p>
            </div>

            <AnimatedButton
              text="Explore All Stories"
              href="/blogs"
              className="mx-auto"
            />
          </div>
        </section>
      </>
      y
    </div>
  );
};

export default Home;
