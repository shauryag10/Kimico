"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Brand splash shown while the first page paints — the KIMICO oval with a
 * sweeping gold underline. Stays up for at least 900ms, never longer than
 * 2.2s, then fades out and unmounts.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const minimum = new Promise((r) => setTimeout(r, 900));
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));
    const cap = new Promise((r) => setTimeout(r, 2200));
    let alive = true;
    Promise.race([Promise.all([minimum, loaded]), cap]).then(() => {
      if (alive) setDone(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          data-preloader
          aria-label="Loading Kimico Foods"
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] grid place-items-center bg-cream"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.86 }}
              animate={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, scale: [0.96, 1.02, 0.96] }
              }
              transition={
                reduce
                  ? { duration: 0.2 }
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src="/brand/logo-kimico.webp"
                alt=""
                width={735}
                height={308}
                priority
                sizes="180px"
                className="h-16 w-auto sm:h-20"
              />
            </motion.div>
            <div className="relative mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-cocoa/10">
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 w-1/3 rounded-full bg-brand-gold"
                initial={{ x: "-120%" }}
                animate={{ x: "340%" }}
                transition={{
                  duration: reduce ? 0 : 1.1,
                  repeat: reduce ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <p className="mt-5 font-display text-sm italic text-cocoa-soft">
              Where happiness is wrapped
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
