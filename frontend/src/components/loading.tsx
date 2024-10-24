import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-full flex flex-col items-center justify-center bg-orange-300"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20"
      >
        <div className="h-full w-full border-4 border-gray-300 border-t-blue-500 rounded-full" />
      </motion.div>
      <motion.h1
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="mt-4 text-xl font-semibold"
      >
        Processing thoughts...
      </motion.h1>
    </motion.div>
  );
};
