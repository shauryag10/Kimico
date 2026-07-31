"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { WrappedChoco } from "@/components/ChocolateBits";

/**
 * Scroll progress along the bottom edge of the sticky header — a ribbon of
 * melted chocolate that spreads as you read, with a gold-wrapped chocolate
 * candy rolling along at its tip. Mounted inside <Header>.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.4,
  });
  const width = useTransform(smooth, (v) => `${v * 100}%`);
  const rotate = useTransform(smooth, (v) => v * 360);
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ width }}
      className="absolute bottom-0 left-0 h-[3px] bg-[linear-gradient(90deg,#2a1810,#54301a_55%,#6d4220_80%,#c9a227)]"
    >
      <span className="absolute -right-4 top-1/2 block -translate-y-1/2">
        <motion.span style={{ rotate }} className="block">
          <WrappedChoco className="h-6 w-auto drop-shadow-[0_2px_4px_rgba(42,24,16,0.35)]" />
        </motion.span>
      </span>
    </motion.div>
  );
}
