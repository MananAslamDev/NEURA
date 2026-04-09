"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedTextProps {
  text: string | React.ReactNode;
  el?: keyof React.JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
}

const defaultAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
    },
  },
};

export function AnimatedText({
  text,
  el: Wrapper = "p",
  className,
  once = true,
}: AnimatedTextProps) {
  // If text is a string, split by words. If it's a ReactNode, render as a single block to avoid breaking markup.
  // Often headings might have complex children (spans). We'll assume if it's string, we split.
  
  if (typeof text !== "string") {
    // Basic wrapper for complex markup without splitting
    return (
      <Wrapper className={className}>
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          variants={defaultAnimations}
          className="inline-block"
        >
          {text}
        </motion.span>
      </Wrapper>
    );
  }

  const textArray = text.split(" ");
  return (
    <Wrapper className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        transition={{ staggerChildren: 0.08 }}
        aria-hidden="true"
        className="inline-block"
      >
        {textArray.map((word, index) => (
          <span className="inline-block" key={index}>
            <motion.span className="inline-block" variants={defaultAnimations}>
              {word}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Wrapper>
  );
}
