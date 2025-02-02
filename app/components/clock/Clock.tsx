import React, { useEffect, useState } from "react";

function ClockFunc() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center h-full p-1 gap-x-3 bg-black">
      <div className="glass-square backdrop-blur-3xl rounded-3xl p-1.5">
        <h1 className="text-8xl font-chintzy antialiased text-white">
          {hours}
        </h1>
      </div>
      <div className="glass-square backdrop-blur-3xl rounded-3xl p-1.5">
        <h1 className="text-8xl font-chintzy antialiased text-white">
          {minutes}
        </h1>
      </div>
    </div>
  );
}

export default ClockFunc;
