import React, { useState, useEffect } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate hand angles
  const secondAngle = (time.getSeconds() * 360) / 60;
  const minuteAngle = (time.getMinutes() * 360) / 60 + (time.getSeconds() * 6) / 60;
  const hourAngle = ((time.getHours() % 12) * 360) / 12 + (time.getMinutes() * 30) / 60;

  return (
    // Remove min-h-screen here so the clock is only as large as needed.
    <div className="flex items-center justify-center">
      <div className="relative w-[10rem] h-[10rem] glass-square rounded-2xl">
        {/* Background clock image */}
        <img
          src="./clock_whited.png"
          alt="Clock face"
          className="absolute z-10 top-0 left-0 w-full h-full object-cover shadow-2xl shadow-black"
        />
        <video
          className="absolute inset-0 z-0 bg-red-200 blur-sm w-full h-full opacity-40"
          src="./clock_nest_loop.mp4"
          loop
          muted
        />

        {/* Overlay with hands */}
        <svg
          className="absolute z-20 top-0 left-0 w-full h-full"
          viewBox="0 0 400 400"
        >
          {/* Hour hand */}
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="120"
            stroke="black"
            strokeWidth="11"
            strokeLinecap="round"
            transform={`rotate(${hourAngle}, 200, 200)`}
          />

          {/* Minute hand */}
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="100"
            stroke="black"
            strokeWidth="9"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle}, 200, 200)`}
          />

          {/* Second hand */}
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="90"
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${secondAngle}, 200, 200)`}
          />

          {/* Center dot */}
          <circle cx="200" cy="200" r="3" fill="black" />
        </svg>
      </div>
    </div>
  );
};

export default AnalogClock;
