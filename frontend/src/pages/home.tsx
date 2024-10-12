import { motion, useScroll, useTransform } from "framer-motion";
import { ParallexImage } from "../components/ParallexImage";
import { parallexImages } from "../config";

const Home = () => {
  const { scrollYProgress } = useScroll();

  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "200%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  return (
    <div className=" h-[200vh] relative">
      <motion.div
        style={{
          backgroundSize,
          opacity,
          backgroundImage: `url(src/assets/openedBook.jpg)`,
        }}
        className="hero h-screen sticky top-0 flex justify-center items-center  bg-cover bg-center bg-no-repeat"
      >
        <motion.div
          animate={{ x: [-500, 10, 0] }}
          transition={{ duration: 3, type: "tween" }}
          className="p-40 pl-96"
        >
          <h1 className="text-9xl text-orange-950 font-heroFont">Thoughts</h1>
          <p className="text-orange-800 text-xl font-mono ">
            Your insight matters
          </p>
        </motion.div>
        <div className="animation absolute right-1/4 bottom-32">
          <motion.div
            style={{
              backgroundImage: `url(src/assets/pen.png)`,
            }}
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
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
  );
};

export default Home;
