// =============================================================================
// MOTION WRAPPER (components/Motion.tsx)
// =============================================================================
// Client Component: framer-motion runs in the browser for animations.
// We re-export motion.div as MotionDiv so AnimeCard (and others) can use
// Framer Motion without importing "use client" in every file that needs animation.
// Usage: <MotionDiv variants={...} initial="hidden" animate="visible">...</MotionDiv>
// =============================================================================
"use client";

import { motion } from "framer-motion";

export const MotionDiv = motion.div;
