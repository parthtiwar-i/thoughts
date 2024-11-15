import { motion, useInView } from "framer-motion";
import { useRef } from "react";
export const InfoSection = () => {
  const bookRef = useRef(null);
  const isInView = useInView(bookRef, { once: true, amount: 0.5 });
  return (
    <div className="bg-orange-50 min-h-[90vh] flex justify-around ">
      <div className="backdrop-blur-sm w-[50%] p-7 flex flex-col grow justify-center items-center">
        <div className="text-3xl font-bold py-5 font-mono">Pick the perfect</div>
        <div className=" text-2xl font-mono">
          Create a beautiful blog that fits your style. Choose from a selection
          of easy-to-use templates – all with flexible layouts and hundreds of
          background images – or design something new.
        </div>
      </div>
      <div className="flex  justify-center items-center grow ">
        <motion.div
          className=""
          animate={{
            backgroundColor: ["#fca5a5", "#bef264", "#7dd3fc", "#c4b5fd"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeIn" }}
        >
          <motion.img
            ref={bookRef}
            initial={{ opacity: 0 }}
            animate={isInView && { x: [200, 0], y: [200, 0], opacity: 1 }}
            transition={{ duration: 1, type: "tween" }}
            src="/history-book.png"
          />
        </motion.div>
      </div>
    </div>
  );
};
