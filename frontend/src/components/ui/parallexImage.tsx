import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface ParallexImages {
  className?: string;
  src: string;
  start: number;
  end: number;
}

export const ParallexImage = React.memo(
  ({ className, src, start, end }: ParallexImages) => {
    const imgRef = useRef(null);

    const { scrollYProgress } = useScroll({
      target: imgRef,
      offset: [`${start}px end`, `end ${end}px`],
    });

    // Move useTransform calls to the top level
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
      <motion.img
        ref={imgRef}
        style={{ opacity, transform }}
        className={`${className}`}
        src={src}
        loading="lazy"
        decoding="async"
      />
    );
  }
);

ParallexImage.displayName = "ParallexImage";
