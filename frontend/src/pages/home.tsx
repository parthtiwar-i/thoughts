import { motion, useScroll, useTransform } from "framer-motion";
import { ParallexImage } from "../components/ParallexImage";

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
        }}
        className="hero h-screen sticky top-0 flex justify-center items-center bg-[url('src/assets/openedBook.jpg')]  bg-cover bg-center bg-no-repeat"
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
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            className="bg-[url('src/assets/pen.png')] bg-cover  w-40 h-40"
          />
        </div>
      </motion.div>
      <ParallexImage
        src="https://images.unsplash.com/photo-1556566952-11eff3d06ed4?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-1/6 h-1/5 absolute left-50 rounded-lg"
        start={0}
        end={100}
      />
      <ParallexImage
        src="https://images.unsplash.com/photo-1704574677437-f49baa9bdeda?q=80&w=1903&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-1/5 h-1/5 absolute right-5 rounded-lg"
        start={300}
        end={100}
      />
      <ParallexImage
        src="https://plus.unsplash.com/premium_photo-1661328021495-1ef34d06c003?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-1/4 h-1/5 absolute left-1/3  rounded-lg"
        start={200}
        end={-1000}
      />
    </div>
  );
};

export default Home;
