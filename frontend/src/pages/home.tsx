import { motion, useScroll, useTransform } from "framer-motion";
import { ParallexImage } from "../components/parallexImage";
import { homeHeroTitle, parallexImages } from "../config";
import { InfoSection } from "../components/infoSection";
import { useNavigate } from "react-router-dom";
import ImageQuoteCard from "../components/imageQuoteSection";

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "200%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  return (
    <div>
      <div className=" h-[200vh] relative">
        <motion.div
          style={{
            backgroundSize,
            opacity,
            backgroundImage: `url(/openedBook.webp)`,
          }}
          className="hero h-screen sticky top-0 flex justify-center items-center  bg-cover bg-center bg-no-repeat"
        >
          <div className="p-40 pl-96">
            <motion.h1
              animate={{ opacity: [0, 1], y: [20, 0], scale: [0.9, 1] }}
              transition={{
                delay: 1,
                duration: 0.5,
              }}
              className="text-9xl text-orange-950 font-heroFont"
            >
              Thoughts
            </motion.h1>
            <p className="text-orange-800 text-xl font-mono ">
              {homeHeroTitle.split(" ").map((el, i) => (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{
                    duration: 2,
                    delay: i,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
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
              className="bg-cover  w-40 h-40"
            />
          </div>
        </motion.div>
        {parallexImages.map((images, i) => (
          <ParallexImage
            key={i}
            src={images.src}
            className={images.className}
            start={images.start}
            end={images.end}
          />
        ))}
      </div>
      {/* infosection */}
      <InfoSection />
      <ImageQuoteCard
        imageSrc="./letterRoll.png"
        leftQuote="This is left Quote"
        rightQuote="This is right quote"
      />
      <div className="bg-orange-50 text-center flex justify-center items-center">
        <button
          onClick={() => navigate("/blogs")}
          className="text-xl font-semibold font-mono hover:cursor-pointer bg-orange-400 hover:bg-orange-500 p-5 rounded-xl shadow-sm border border-red-400 w-[20%]"
        >
          Move to Blogs
        </button>
      </div>
    </div>
  );
};

export default Home;
