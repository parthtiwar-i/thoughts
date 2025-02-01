import { useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallexImage } from "../components/parallexImage";
import { homeHeroTitle, parallexImages } from "../config";
import { InfoSection } from "../components/infoSection";
import { useNavigate } from "react-router-dom";
import ImageQuoteCard from "../components/imageQuoteSection";

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Transform values without useMemo
  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "200%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  // Memoize navigation handler
  const handleNavigate = useCallback(() => {
    navigate("/blogs");
  }, [navigate]);

  // Memoized hero text animation variants
  const textAnimation = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  // Memoized animated title
  const animatedTitle = useMemo(
    () =>
      homeHeroTitle.split(" ").map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: i * 0.2, // Adjust delay to be more natural
          }}
        >
          {el}{" "}
        </motion.span>
      )),
    []
  );

  // Memoized parallex images
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
    <div>
      <div className="h-[200vh] relative">
        <motion.div
          style={{
            backgroundSize,
            opacity,
            backgroundImage: `url(/openedBook.webp)`,
          }}
          className="hero h-screen sticky top-0 flex justify-center items-center bg-cover bg-center bg-no-repeat"
        >
          <div className="p-40 pl-96">
            <motion.h1
              variants={textAnimation}
              initial="initial"
              animate="animate"
              transition={{
                delay: 1,
                duration: 0.5,
              }}
              className="text-9xl text-orange-950 font-heroFont"
            >
              Thoughts
            </motion.h1>
            <p className="text-orange-800 text-xl font-mono">{animatedTitle}</p>
          </div>
          <div className="animation absolute right-1/4 bottom-32">
            <motion.div
              style={{
                backgroundImage: `url(/pen.webp)`,
              }}
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute w-36 h-36 bg-cover right-1/4 bottom-8"
            />
          </div>
        </motion.div>

        {parallexImagesComponents}
      </div>

      <InfoSection />
      <ImageQuoteCard
        imageSrc="./letterRoll.png"
        leftQuote="This is left Quote"
        rightQuote="This is right quote"
      />

      <div className="bg-orange-50 text-center flex justify-center items-center">
        <button
          onClick={handleNavigate}
          className="text-lg font-semibold font-mono hover:cursor-pointer bg-orange-200 hover:bg-orange-300 p-3 rounded-xl shadow-sm border border-red-400"
        >
          Move to Blogs
        </button>
      </div>
    </div>
  );
};

export default Home;
