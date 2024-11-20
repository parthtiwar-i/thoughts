import React, { useRef, useMemo } from "react";
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

    // Memoize transform calculations
    const { opacity, y, scale } = useMemo(
      () => ({
        opacity: useTransform(scrollYProgress, [0, 1], [1, 0.75]),
        y: useTransform(scrollYProgress, [0, 1], [start, end]),
        scale: useTransform(scrollYProgress, [0, 1], [1, 0.75]),
      }),
      [scrollYProgress, start, end]
    );

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
