import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedDigitProps {
  digit: string;
  index: number;
  className?: string;
}

const AnimatedDigit: React.FC<AnimatedDigitProps> = ({
  digit,
  index,
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${index}-${digit}`}
        // Initial: offscreen downward with blur; Animate: at rest with no blur; Exit: upward and blurred.
        initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
        transition={{
          // Apple-like spring for vertical motion – subtle, snappy, and smooth.
          y: { type: "spring", stiffness: 170, damping: 26 },
          // A fast, easing opacity transition.
          opacity: { duration: 0.2, ease: "easeInOut" },
          // Blur transitions with a custom cubic-bezier reminiscent of Apple's curves.
          filter: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
        }}
        className={className}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  );
};

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  // Update the time every second.
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Create two-digit strings for hours and seconds (using seconds for animation testing).
  const hoursStr = useMemo(
    () => time.getHours().toString().padStart(2, "0"),
    [time]
  );
  const minutesStr = useMemo(
    () => time.getMinutes().toString().padStart(2, "0"),
    [time]
  );
  const minuteDigits = minutesStr.split("");

  const dateString = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(time),
    [time]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center z-30">
        <p className="text-xl font-medium text-white/85 -mb-8">{dateString}</p>
        <div className="flex items-center justify-center gap-x-16 w-[32rem]">
          {/* Render hours with individual digit animations */}
          <span className="flex w-32">
            {hoursStr.split("").map((digit, i) => (
              // Note: Added overflow-visible so the Y-axis motion isn’t clipped.
              <span key={i} className="w-min text-center overflow-visible">
                <AnimatedDigit
                  index={i}
                  digit={digit}
                  className="text-[11rem] font-chintzy antialiased text-white/70"
                />
              </span>
            ))}
          </span>
          {/* Render seconds (used here for testing) with individual digit animations */}
          <span className="flex w-min">
            {/* Use inline-flex with overflow-visible to allow Y-axis animation */}
            {minuteDigits.map((digit, i) => (
              <span
                className="inline-flex justify-center overflow-visible"
                key={i}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={digit}
                    initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
                    transition={{
                      y: { type: "spring", stiffness: 170, damping: 26 },
                      opacity: { duration: 0.2, ease: "easeInOut" },
                      filter: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                    }}
                    className="relative text-[11rem] font-chintzy antialiased text-white/70"
                  >
                    {digit}
                  </motion.span>
                </AnimatePresence>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
