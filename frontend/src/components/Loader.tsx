import { motion } from "framer-motion";
export const Loader = () => {
  return (
    <div>
      <motion.div
        animate={{ opacity: [0.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex gap-10 items-center px-20 w-full mb-2"
      >
        <div role="status" className="animate-pulse w-screen  ">
          <div className="col-span-3 flex flex-col">
            <div className="text-5xl font-bold font-serif py-3 leading-snug ">
              <div className="h-4 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
            </div>
            <div className="text-lg text-gray-400 py-5">
              <div className="h-2 bg-gray-200 rounded-full w-36  mb-2.5"></div>
            </div>
            <div className="text-lg tracking-wide leading-9 text-gray-800">
              <div className="h-2.5 bg-gray-200 rounded-full  w-2/3 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-2/3 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <svg
            className="w-16 h-16 me-3 text-gray-200 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="w-full h-full">
            <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2  "></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex gap-10 items-center px-20 w-full mb-2"
      >
        <div role="status" className="animate-pulse w-screen  ">
          <div className="col-span-3 flex flex-col">
            <div className="text-5xl font-bold font-serif py-3 leading-snug ">
              <div className="h-4 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
            </div>
            <div className="text-lg text-gray-400 py-5">
              <div className="h-2 bg-gray-200 rounded-full w-36  mb-2.5"></div>
            </div>
            <div className="text-lg tracking-wide leading-9 text-gray-800">
              <div className="h-2.5 bg-gray-200 rounded-full  w-2/3 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-2/3 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <svg
            className="w-16 h-16 me-3 text-gray-200 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="w-full h-full">
            <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2  "></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="flex gap-10 items-center px-20 w-full mb-2"
      >
        <div role="status" className="animate-pulse w-screen  ">
          <div className="col-span-3 flex flex-col">
            <div className="text-5xl font-bold font-serif py-3 leading-snug ">
              <div className="h-4 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
            </div>
            <div className="text-lg text-gray-400 py-5">
              <div className="h-2 bg-gray-200 rounded-full w-36  mb-2.5"></div>
            </div>
            <div className="text-lg tracking-wide leading-9 text-gray-800">
              <div className="h-2.5 bg-gray-200 rounded-full  w-2/3 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-2/3 mb-4"></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-3/4 mb-4"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <svg
            className="w-16 h-16 me-3 text-gray-200 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="w-full h-full">
            <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2  "></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
