import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Memoized digit component to prevent unnecessary re-renders
const Digit = React.memo(({ digit, i }: { digit: string; i: any }) => (
  <motion.span
    key={digit}
    initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
    exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
    transition={{
      y: { type: "spring", stiffness: 170, damping: 26 },
      opacity: { duration: 0.2 },
      filter: { duration: i * 0.3 },
    }}
    className="relative text-[11rem] font-chintzy text-white/80 cursor-default select-none"
    style={{ willChange: "transform, opacity, filter" }}
  >
    {digit}
  </motion.span>
));
Digit.displayName = "Digit";

// Memoized time block component
/**
 * `TimeBlock` is a memoized functional component that renders a series of digits.
 * Each digit is wrapped in a span with specific styling and an animation presence.
 *
 * @param {string[]} props.digits An array of digit strings to be displayed.
 *
 * @returns {JSX.Element} A JSX element containing the rendered digits.
 */
const TimeBlock = React.memo(({ digits }: { digits: string[] }) => (
  <span className="flex">
    {digits.map((digit, i) => (
      <span
        className="inline-flex justify-center overflow-visible"
        key={`${digit}-${i}`}
      >
        <AnimatePresence mode="wait">
          <Digit digit={digit} i={i} />
        </AnimatePresence>
      </span>
    ))}
  </span>
));

TimeBlock.displayName = "TimeBlock";

const Clock: React.FC = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Memoize date parts to prevent unnecessary recalculations
  const [hoursStr, minutesStr, dateString] = useMemo(() => {
    const today = new Date(time);
    today.setHours(0, 0, 0, 0);

    return [
      time.getHours().toString().padStart(2, "0"),
      time.getMinutes().toString().padStart(2, "0"),
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(time),
    ];
  }, [time]); // Only update when time changes significantly

  const hourDigits = useMemo(() => hoursStr.split(""), [hoursStr]);
  const minuteDigits = useMemo(() => minutesStr.split(""), [minutesStr]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center z-30">
        <p className="text-xl font-medium text-white/85 -mb-8">{dateString}</p>
        <div className="flex items-center justify-center gap-x-10">
          <TimeBlock digits={hourDigits} />
          <TimeBlock digits={minuteDigits} />
        </div>
      </div>
    </div>
  );
};

export default Clock;
