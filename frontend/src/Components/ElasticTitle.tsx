import { motion, useAnimationControls } from "framer-motion";
import React from "react";

interface ElasticTitleProps {
  title: string;
}

const ElasticTitle: React.FC<ElasticTitleProps> = ({ title }) => {
  let heading = title.split("");
  return (
    <div className="flex items-center justify-center">
        {heading.map((char, index) => (
        <TextSpan key={index}>{char}</TextSpan>
      ))}
    </div>
  );
};

interface TextSpanProps {
  children: React.ReactNode;
}

const TextSpan: React.FC<TextSpanProps> = ({ children }) => {
  const controls = useAnimationControls();

  const rubberBand = () => {
    controls.start({
      transform: [
        "scale3d(1, 1, 1)",
        "scale3d(1.4, 0.55, 1)",
        "scale3d(1.25, 0.85, 1)",
        "scale3d(0.9, 1.05, 1)",
        "scale3d(1, 1, 1)"
      ],
      transition: {
        times: [0.4, 0.6, 0.7, 0.8, 0.9]
      }
    });
  };

  return (
    <motion.span
      animate={controls}
      onMouseOver={() => {
        rubberBand();
      }}
      className="inline-block text-3xl md:text-4xl lg:text-6xl font-bold uppercase text-white whitespace-nowrap"
    >
      {children}
    </motion.span>
  );
};

export default ElasticTitle;
