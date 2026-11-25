"use client";

import { motion, useReducedMotion } from "motion/react";

// Same five second loop as the "Undo any slip-up" card on getbeamy.app:
// the playhead slips ahead, the undo pill appears, a tap puts it back.
const loop = { duration: 5, repeat: Infinity };

export function UndoDemo() {
  const reduced = useReducedMotion();

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-10 p-10" aria-hidden="true">
      <div className="h-2 w-full rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-foreground"
          initial={{ width: reduced ? "92%" : "30%" }}
          animate={reduced ? undefined : { width: ["30%", "30%", "92%", "92%", "30%", "30%"] }}
          transition={{ ...loop, times: [0, 0.18, 0.24, 0.64, 0.72, 1], ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="flex h-14 items-center gap-5 rounded-full bg-foreground pr-2.5 pl-6 text-lg text-background"
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
        animate={reduced ? undefined : { opacity: [0, 0, 1, 1, 0, 0], y: [8, 8, 0, 0, 0, 0] }}
        transition={{ ...loop, times: [0, 0.26, 0.34, 0.66, 0.76, 1], ease: "easeOut" }}
      >
        <span className="opacity-75">Jumped 4 hours ahead</span>
        <motion.span
          className="rounded-full bg-background/15 px-5 py-2 font-semibold"
          animate={reduced ? undefined : { scale: [1, 1, 0.86, 1, 1] }}
          transition={{ ...loop, times: [0, 0.58, 0.62, 0.66, 1], ease: "easeInOut" }}
        >
          Undo
        </motion.span>
      </motion.div>
    </div>
  );
}
