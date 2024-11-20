import React, { useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallexImage } from "../components/parallexImage";
import { homeHeroTitle, parallexImages } from "../config";
import { InfoSection } from "../components/infoSection";
import { useNavigate } from "react-router-dom";
import ImageQuoteCard from "../components/imageQuoteSection";

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  // Memoize transform values
  const backgroundSize = useMemo(
    () => useTransform(scrollYProgress, [0, 1], ["100%", "200%"]),
    [scrollYProgress]
  );

  const opacity = useMemo(
    () => useTransform(scrollYProgress, [0, 1], [1, 0.75]),
    [scrollYProgress]
  );

  // Memoize navigation handler
  const handleNavigate = useCallback(() => {
    navigate("/blogs");
  }, [navigate]);

  // Memoize hero text animation variants
  const textAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
    }),
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
            <p className="text-orange-800 text-xl font-mono">
              {useMemo(
                () =>
                  homeHeroTitle.split(" ").map((el, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 2,
                        delay: i,
                      }}
                    >
                      {el}{" "}
                    </motion.span>
                  )),
                []
              )}
            </p>
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
              className="bg-cover w-40 h-40"
            />
          </div>
        </motion.div>

        {useMemo(
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
        )}
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

export default React.memo(Home);
